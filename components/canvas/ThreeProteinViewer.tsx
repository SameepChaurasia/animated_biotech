"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RotateCw, Eye, ZoomIn, ZoomOut, RefreshCcw, Box } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { soundManager } from "@/lib/audio";

interface ThreeProteinViewerProps {
  className?: string;
}

type MoleculeMode = "double-helix" | "alpha-helix" | "binding-pocket";

export const ThreeProteinViewer: React.FC<ThreeProteinViewerProps> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mode, setMode] = useState<MoleculeMode>("double-helix");
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [activeAtomInfo, setActiveAtomInfo] = useState<string>("P-8849 [PHOSPHATE BACKBONE]");
  const [zoomLevel, setZoomLevel] = useState<number>(28);
  const isReducedMotion = useReducedMotion();

  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  const resetCameraView = () => {
    soundManager.playClickSound();
    setZoomLevel(34);
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 0, 34);
    }
    if (groupRef.current) {
      groupRef.current.rotation.set(0, 0, 0);
      groupRef.current.scale.set(0.68, 0.68, 0.68);
    }
  };

  const handleZoom = (delta: number) => {
    soundManager.playClickSound();
    setZoomLevel((prev) => {
      const next = Math.max(16, Math.min(42, prev + delta));
      if (cameraRef.current) {
        cameraRef.current.position.z = next;
      }
      return next;
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Create 3D Scene, Camera, Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 34);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    rendererRef.current = renderer;

    // Deep Piction Lighting setup (Royal Blue & Indigo/Purple)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLightBlue = new THREE.PointLight(0x3b82f6, 5, 60);
    pointLightBlue.position.set(12, 12, 12);
    scene.add(pointLightBlue);

    const pointLightIndigo = new THREE.PointLight(0x818cf8, 5, 60);
    pointLightIndigo.position.set(-12, -12, -12);
    scene.add(pointLightIndigo);

    // Parent group for rotation
    const moleculeGroup = new THREE.Group();
    moleculeGroup.scale.set(0.68, 0.68, 0.68);
    scene.add(moleculeGroup);
    groupRef.current = moleculeGroup;

    // Ambient Molecular Particle Cloud
    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 120;
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 20;
      posArray[i + 1] = (Math.random() - 0.5) * 20;
      posArray[i + 2] = (Math.random() - 0.5) * 20;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.18,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    scene.add(particlePoints);

    // Helper to safely dispose objects
    const clearGroup = () => {
      moleculeGroup.children.forEach((child) => {
        if (child instanceof THREE.Mesh || child instanceof THREE.Points) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
      moleculeGroup.clear();
    };

    // Build 3D Double Helix
    const buildDoubleHelix = () => {
      clearGroup();

      const points1: THREE.Vector3[] = [];
      const points2: THREE.Vector3[] = [];
      const numTurns = 3;
      const numPoints = 80;
      const radius = 4.5;
      const heightStep = 14;

      for (let i = 0; i <= numPoints; i++) {
        const t = (i / numPoints) * Math.PI * 2 * numTurns;
        const y = ((i / numPoints) - 0.5) * heightStep;

        const x1 = Math.cos(t) * radius;
        const z1 = Math.sin(t) * radius;

        const x2 = Math.cos(t + Math.PI) * radius;
        const z2 = Math.sin(t + Math.PI) * radius;

        points1.push(new THREE.Vector3(x1, y, z1));
        points2.push(new THREE.Vector3(x2, y, z2));

        // Create Atom Node Spheres along strands
        if (i % 3 === 0) {
          const sphereGeo = new THREE.SphereGeometry(0.38, 16, 16);
          const mat1 = new THREE.MeshStandardMaterial({
            color: 0x3b82f6,
            emissive: 0x2563eb,
            emissiveIntensity: 0.7,
            roughness: 0.2,
            metalness: 0.3,
          });
          const sphere1 = new THREE.Mesh(sphereGeo, mat1);
          sphere1.position.set(x1, y, z1);
          moleculeGroup.add(sphere1);

          const mat2 = new THREE.MeshStandardMaterial({
            color: 0xa855f7,
            emissive: 0x9333ea,
            emissiveIntensity: 0.7,
            roughness: 0.2,
            metalness: 0.3,
          });
          const sphere2 = new THREE.Mesh(sphereGeo, mat2);
          sphere2.position.set(x2, y, z2);
          moleculeGroup.add(sphere2);

          // Connecting Base-Pair Rungs
          const cylinderGeo = new THREE.CylinderGeometry(0.09, 0.09, radius * 2, 8);
          const cylinderMat = new THREE.MeshStandardMaterial({
            color: 0x64748b,
            metalness: 0.8,
            roughness: 0.2,
          });
          const rung = new THREE.Mesh(cylinderGeo, cylinderMat);
          rung.position.set(0, y, 0);
          rung.rotation.z = Math.PI / 2;
          rung.rotation.y = -t;
          moleculeGroup.add(rung);
        }
      }

      // Build Tube Geometry Backbones
      const curve1 = new THREE.CatmullRomCurve3(points1);
      const curve2 = new THREE.CatmullRomCurve3(points2);

      const tubeGeo1 = new THREE.TubeGeometry(curve1, 80, 0.38, 12, false);
      const tubeGeo2 = new THREE.TubeGeometry(curve2, 80, 0.38, 12, false);

      const tubeMat1 = new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.25, metalness: 0.2 });
      const tubeMat2 = new THREE.MeshStandardMaterial({ color: 0x818cf8, roughness: 0.25, metalness: 0.2 });

      moleculeGroup.add(new THREE.Mesh(tubeGeo1, tubeMat1));
      moleculeGroup.add(new THREE.Mesh(tubeGeo2, tubeMat2));
    };

    // Build Alpha Helix
    const buildAlphaHelix = () => {
      clearGroup();
      const points: THREE.Vector3[] = [];
      const numPoints = 100;
      const radius = 3.2;

      for (let i = 0; i <= numPoints; i++) {
        const t = (i / numPoints) * Math.PI * 8;
        const y = ((i / numPoints) - 0.5) * 16;
        const x = Math.cos(t) * radius;
        const z = Math.sin(t) * radius;
        points.push(new THREE.Vector3(x, y, z));

        if (i % 2 === 0) {
          const sphereGeo = new THREE.SphereGeometry(0.42, 16, 16);
          const mat = new THREE.MeshStandardMaterial({
            color: i % 4 === 0 ? 0xc084fc : 0x38bdf8,
            emissive: i % 4 === 0 ? 0xa855f7 : 0x0284c7,
            emissiveIntensity: 0.6,
          });
          const sphere = new THREE.Mesh(sphereGeo, mat);
          sphere.position.set(x, y, z);
          moleculeGroup.add(sphere);
        }
      }

      const curve = new THREE.CatmullRomCurve3(points);
      const tubeGeo = new THREE.TubeGeometry(curve, 100, 0.48, 12, false);
      const tubeMat = new THREE.MeshStandardMaterial({ color: 0x6366f1, roughness: 0.2 });
      moleculeGroup.add(new THREE.Mesh(tubeGeo, tubeMat));
    };

    // Build Binding Pocket Complex
    const buildBindingPocket = () => {
      clearGroup();
      const sphereGeo = new THREE.SphereGeometry(0.65, 16, 16);
      const centerCore = new THREE.Mesh(
        new THREE.SphereGeometry(2.4, 32, 32),
        new THREE.MeshStandardMaterial({ color: 0x3b82f6, emissive: 0x2563eb, emissiveIntensity: 0.8, wireframe: true })
      );
      moleculeGroup.add(centerCore);

      for (let i = 0; i < 24; i++) {
        const phi = Math.acos(-1 + (2 * i) / 24);
        const theta = Math.sqrt(24 * Math.PI) * phi;
        const radius = 5.6;

        const x = radius * Math.cos(theta) * Math.sin(phi);
        const y = radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(phi);

        const atom = new THREE.Mesh(
          sphereGeo,
          new THREE.MeshStandardMaterial({ color: i % 2 === 0 ? 0x60a5fa : 0xa855f7, metalness: 0.4 })
        );
        atom.position.set(x, y, z);
        moleculeGroup.add(atom);

        const cylinder = new THREE.Mesh(
          new THREE.CylinderGeometry(0.07, 0.07, radius, 8),
          new THREE.MeshBasicMaterial({ color: 0x818cf8, wireframe: true })
        );
        cylinder.position.set(x / 2, y / 2, z / 2);
        cylinder.lookAt(new THREE.Vector3(x, y, z));
        cylinder.rotateX(Math.PI / 2);
        moleculeGroup.add(cylinder);
      }
    };

    // Build model by selected mode
    if (mode === "double-helix") buildDoubleHelix();
    else if (mode === "alpha-helix") buildAlphaHelix();
    else buildBindingPocket();

    // Smooth Mouse Drag Orbiting
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !moleculeGroup) return;

      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      moleculeGroup.rotation.y += deltaX * 0.008;
      moleculeGroup.rotation.x += deltaY * 0.008;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Render Loop
    let reqId: number;
    const animate = () => {
      reqId = requestAnimationFrame(animate);

      if (autoRotate && !isDragging && !isReducedMotion && moleculeGroup) {
        moleculeGroup.rotation.y += 0.006;
        moleculeGroup.rotation.x += 0.002;
      }

      particlePoints.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      particleGeo.dispose();
      particleMat.dispose();
      clearGroup();
      renderer.dispose();
    };
  }, [mode, autoRotate, isReducedMotion, zoomLevel]);

  const handleModeChange = (newMode: MoleculeMode) => {
    soundManager.playClickSound();
    setMode(newMode);
    if (newMode === "double-helix") setActiveAtomInfo("P-8849 [DOUBLE HELIX BACKBONE]");
    else if (newMode === "alpha-helix") setActiveAtomInfo("VAL-104 [ALPHA HELIX SECONDARY]");
    else setActiveAtomInfo("KD-0.18nM [LIGAND BINDING POCKET]");
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[440px] md:h-[520px] rounded-[32px] overflow-hidden bg-slate-950/80 backdrop-blur-2xl border border-blue-500/30 flex flex-col justify-between p-6 shadow-[0_25px_60px_rgba(0,0,0,0.8)] ${className}`}
    >
      {/* Top Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 z-10 pb-3 border-b border-slate-800/80 bg-slate-900/60 p-3 rounded-2xl backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />
          <span className="font-mono text-xs text-blue-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
            <Box className="w-3.5 h-3.5 text-blue-400" />
            // 3D BIOMOLECULAR STRUCTURE PREDICTOR
          </span>
        </div>

        {/* View Mode Buttons */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-full border border-slate-800 font-mono text-[11px]">
          <button
            onClick={() => handleModeChange("double-helix")}
            className={`px-3 py-1 rounded-full font-bold uppercase transition-all ${
              mode === "double-helix"
                ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.6)]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            DNA Helix 3D
          </button>
          <button
            onClick={() => handleModeChange("alpha-helix")}
            className={`px-3 py-1 rounded-full font-bold uppercase transition-all ${
              mode === "alpha-helix"
                ? "bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.6)]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Alpha Fold
          </button>
          <button
            onClick={() => handleModeChange("binding-pocket")}
            className={`px-3 py-1 rounded-full font-bold uppercase transition-all ${
              mode === "binding-pocket"
                ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.6)]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Binding Pocket
          </button>
        </div>
      </div>

      {/* Main 3D Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-0" />

      {/* Bottom Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 z-10 pt-3 border-t border-slate-800/80 bg-slate-900/80 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg">
        <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
          <Eye className="w-4 h-4 text-blue-400" />
          <span className="text-white font-bold">{activeAtomInfo}</span>
        </div>

        {/* Interactive Controls Bar */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-slate-400 hidden lg:inline mr-2">
            DRAG TO ORBIT 3D MODEL
          </span>

          <button
            onClick={() => handleZoom(-3)}
            className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:border-blue-500 hover:text-blue-400 transition-all"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleZoom(3)}
            className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:border-blue-500 hover:text-blue-400 transition-all"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <button
            onClick={resetCameraView}
            className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:border-blue-500 hover:text-blue-400 transition-all"
            title="Reset View"
          >
            <RefreshCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              soundManager.playClickSound();
              setAutoRotate(!autoRotate);
            }}
            className={`p-2 rounded-xl border transition-all ${
              autoRotate
                ? "bg-blue-600/30 text-blue-300 border-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.4)]"
                : "bg-slate-950 text-slate-500 border-slate-800"
            }`}
            title="Toggle Auto Rotation"
          >
            <RotateCw className={`w-4 h-4 ${autoRotate ? "animate-spin" : ""}`} style={{ animationDuration: "8s" }} />
          </button>
        </div>
      </div>
    </div>
  );
};


