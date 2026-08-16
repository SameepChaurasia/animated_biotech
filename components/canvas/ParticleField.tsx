"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export interface ParticleFieldProps {
  palette?: string[];
  count?: number;
  speed?: number;
  bondDist?: number;
  maxBonds?: number;
  className?: string;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
  palette = ["#4a6cf7", "#8b7cf6"],
  count = 150,
  speed = 0.02,
  bondDist = 40,
  maxBonds = 20,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [shouldRender, setShouldRender] = useState(false);

  // Keep references to config props so scroll state updates in parent never re-trigger WebGL recreation
  const paletteRef = useRef(palette);
  paletteRef.current = palette;
  const countRef = useRef(count);
  countRef.current = count;
  const speedRef = useRef(speed);
  speedRef.current = speed;
  const bondDistRef = useRef(bondDist);
  bondDistRef.current = bondDist;
  const maxBondsRef = useRef(maxBonds);
  maxBondsRef.current = maxBonds;

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    if (!isReduced && !isMobile) setShouldRender(true);
  }, []);

  useEffect(() => {
    if (!shouldRender || !canvasRef.current || !containerRef.current) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.OrthographicCamera | null = null;
    let pGeo: THREE.BufferGeometry | null = null;
    let pMat: THREE.PointsMaterial | null = null;
    let lGeo: THREE.BufferGeometry | null = null;
    let lMat: THREE.LineBasicMaterial | null = null;
    let isVisible = false;
    let rafId = 0;

    const curCount = countRef.current;
    const curPalette = paletteRef.current;
    const colors = curPalette.map((hex) => new THREE.Color(hex));
    const pos = new Float32Array(curCount * 3);
    const vel = new Float32Array(curCount * 2);
    const pCol = new Float32Array(curCount * 3);

    for (let i = 0; i < curCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * width;
      pos[i * 3 + 1] = (Math.random() - 0.5) * height;
      const angle = Math.random() * Math.PI * 2;
      vel[i * 2] = Math.cos(angle) * (15 + Math.random() * 25);
      vel[i * 2 + 1] = Math.sin(angle) * (15 + Math.random() * 25);
      const c = colors[i % colors.length];
      pCol[i * 3] = c.r;
      pCol[i * 3 + 1] = c.g;
      pCol[i * 3 + 2] = c.b;
    }

    try {
      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, 0.1, 100);
      camera.position.z = 10;

      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: "low-power",
      });
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(width, height, false);

      pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      pGeo.setAttribute("color", new THREE.BufferAttribute(pCol, 3));
      pMat = new THREE.PointsMaterial({
        size: 1.5,
        vertexColors: true,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const points = new THREE.Points(pGeo, pMat);
      scene.add(points);

      const curMaxBonds = maxBondsRef.current;
      const lPos = new Float32Array(curMaxBonds * 6);
      const lCol = new Float32Array(curMaxBonds * 6);
      lGeo = new THREE.BufferGeometry();
      lGeo.setAttribute("position", new THREE.BufferAttribute(lPos, 3));
      lGeo.setAttribute("color", new THREE.BufferAttribute(lCol, 3));
      lGeo.setDrawRange(0, 0);
      lMat = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const lines = new THREE.LineSegments(lGeo, lMat);
      scene.add(lines);

      renderer.render(scene, camera);
    } catch {
      if (canvas) canvas.style.display = "none";
      return;
    }

    const animate = () => {
      if (!isVisible || !renderer || !scene || !camera || !pGeo || !lGeo) return;
      const halfW = width / 2;
      const halfH = height / 2;
      const curSpeed = speedRef.current;
      const curBondDist = bondDistRef.current;
      const curMaxBonds = maxBondsRef.current;
      const bondDistSq = curBondDist * curBondDist;

      for (let i = 0; i < curCount; i++) {
        pos[i * 3] += vel[i * 2] * curSpeed;
        pos[i * 3 + 1] += vel[i * 2 + 1] * curSpeed;
        if (pos[i * 3] > halfW) pos[i * 3] = -halfW;
        else if (pos[i * 3] < -halfW) pos[i * 3] = halfW;
        if (pos[i * 3 + 1] > halfH) pos[i * 3 + 1] = -halfH;
        else if (pos[i * 3 + 1] < -halfH) pos[i * 3 + 1] = halfH;
      }
      pGeo.attributes.position.needsUpdate = true;

      let bonds = 0;
      const lPosArray = lGeo.attributes.position.array as Float32Array;
      const lColArray = lGeo.attributes.color.array as Float32Array;

      for (let i = 0; i < curCount && bonds < curMaxBonds; i++) {
        const x1 = pos[i * 3];
        const y1 = pos[i * 3 + 1];
        for (let j = i + 1; j < curCount && bonds < curMaxBonds; j++) {
          const dx = x1 - pos[j * 3];
          const dy = y1 - pos[j * 3 + 1];
          const dSq = dx * dx + dy * dy;
          if (dSq < bondDistSq) {
            const alpha = 1 - Math.sqrt(dSq) / curBondDist;
            const idx = bonds * 6;
            lPosArray[idx] = x1; lPosArray[idx + 1] = y1; lPosArray[idx + 2] = 0;
            lPosArray[idx + 3] = pos[j * 3]; lPosArray[idx + 4] = pos[j * 3 + 1]; lPosArray[idx + 5] = 0;
            const c1 = colors[i % colors.length];
            const c2 = colors[j % colors.length];
            lColArray[idx] = c1.r * alpha; lColArray[idx + 1] = c1.g * alpha; lColArray[idx + 2] = c1.b * alpha;
            lColArray[idx + 3] = c2.r * alpha; lColArray[idx + 4] = c2.g * alpha; lColArray[idx + 5] = c2.b * alpha;
            bonds++;
          }
        }
      }
      lGeo.setDrawRange(0, bonds * 2);
      lGeo.attributes.position.needsUpdate = true;
      lGeo.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(([entry]) => {
      const becameVisible = entry.isIntersecting;
      if (becameVisible) {
        isVisible = true;
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(animate);
      } else {
        isVisible = false;
        cancelAnimationFrame(rafId);
      }
    }, { threshold: 0.01, rootMargin: "100px" });
    observer.observe(container);

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      if (camera) {
        camera.left = -width / 2; camera.right = width / 2;
        camera.top = height / 2; camera.bottom = -height / 2;
        camera.updateProjectionMatrix();
      }
      if (renderer && scene && camera) {
        renderer.setClearColor(0x000000, 0);
        renderer.setSize(width, height, false);
        renderer.render(scene, camera);
      }
    };
    window.addEventListener("resize", handleResize);

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      isVisible = false;
      cancelAnimationFrame(rafId);
      if (canvas) canvas.style.display = "none";
    };
    canvas.addEventListener("webglcontextlost", handleContextLost, false);

    return () => {
      isVisible = false;
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      pGeo?.dispose(); pMat?.dispose();
      lGeo?.dispose(); lMat?.dispose();
      try {
        renderer?.dispose();
        renderer?.forceContextLoss();
      } catch {}
    };
  }, [shouldRender]);

  if (!shouldRender) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none overflow-hidden z-10 opacity-25 ${className}`}
      style={{ background: "transparent", backgroundColor: "transparent" }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block bg-transparent pointer-events-none"
        style={{ background: "transparent", backgroundColor: "transparent" }}
      />
    </div>
  );
};

export default ParticleField;
