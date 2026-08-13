"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RotateCw, Sparkles, Layers, Eye } from "lucide-react";
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
  const isReducedMotion = useReducedMotion();

  const sceneRef = useRef<THREE.Scene | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

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
    camera.position.set(0, 0, 28);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLightLime = new THREE.PointLight(0xc8ff4d, 3, 50);
    pointLightLime.position.set(10, 10, 10);
    scene.add(pointLightLime);

    const pointLightCyan = new THREE.PointLight(0x00e5ff, 3, 50);
    pointLightCyan.position.set(-10, -10, -10);
    scene.add(pointLightCyan);

    // Parent group for rotation
    const moleculeGroup = new THREE.Group();
    scene.add(moleculeGroup);
    groupRef.current = moleculeGroup;

    // Helper function to build 3D Double Helix
    const buildDoubleHelix = () => {
      moleculeGroup.clear();

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
          const sphereGeo = new THREE.SphereGeometry(0.35, 16, 16);
          const mat1 = new THREE.MeshStandardMaterial({
            color: 0xc8ff4d,
            emissive: 0xc8ff4d,
            emissiveIntensity: 0.5,
            roughness: 0.2,
          });
          const sphere1 = new THREE.Mesh(sphereGeo, mat1);
          sphere1.position.set(x1, y, z1);
          moleculeGroup.add(sphere1);

          const mat2 = new THREE.MeshStandardMaterial({
            color: 0x00e5ff,
            emissive: 0x00e5ff,
            emissiveIntensity: 0.5,
            roughness: 0.2,
          });
          const sphere2 = new THREE.Mesh(sphereGeo, mat2);
          sphere2.position.set(x2, y, z2);
          moleculeGroup.add(sphere2);

          // Connecting Base-Pair Rungs
          const cylinderGeo = new THREE.CylinderGeometry(0.08, 0.08, radius * 2, 8);
          const cylinderMat = new THREE.MeshStandardMaterial({
            color: 0x8a968e,
            metalness: 0.8,
            roughness: 0.3,
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

      const tubeGeo1 = new THREE.TubeGeometry(curve1, 80, 0.35, 12, false);
      const tubeGeo2 = new THREE.TubeGeometry(curve2, 80, 0.35, 12, false);

      const tubeMat1 = new THREE.MeshStandardMaterial({ color: 0xc8ff4d, roughness: 0.3 });
      const tubeMat2 = new THREE.MeshStandardMaterial({ color: 0x00e5ff, roughness: 0.3 });

      moleculeGroup.add(new THREE.Mesh(tubeGeo1, tubeMat1));
      moleculeGroup.add(new THREE.Mesh(tubeGeo2, tubeMat2));
    };

    // Helper function to build Alpha Helix
    const buildAlphaHelix = () => {
      moleculeGroup.clear();
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
          const sphereGeo = new THREE.SphereGeometry(0.4, 16, 16);
          const mat = new THREE.MeshStandardMaterial({
            color: i % 4 === 0 ? 0xff6b9d : 0x0fa37f,
            emissive: i % 4 === 0 ? 0xff6b9d : 0x0fa37f,
            emissiveIntensity: 0.4,
          });
          const sphere = new THREE.Mesh(sphereGeo, mat);
          sphere.position.set(x, y, z);
          moleculeGroup.add(sphere);
        }
      }

      const curve = new THREE.CatmullRomCurve3(points);
      const tubeGeo = new THREE.TubeGeometry(curve, 100, 0.45, 12, false);
      const tubeMat = new THREE.MeshStandardMaterial({ color: 0x0fa37f, roughness: 0.2 });
      moleculeGroup.add(new THREE.Mesh(tubeGeo, tubeMat));
    };

    // Helper function to build Binding Pocket Complex
    const buildBindingPocket = () => {
      moleculeGroup.clear();
      const sphereGeo = new THREE.SphereGeometry(0.6, 16, 16);
      const centerCore = new THREE.Mesh(
        new THREE.SphereGeometry(2.2, 32, 32),
        new THREE.MeshStandardMaterial({ color: 0xc8ff4d, emissive: 0xc8ff4d, emissiveIntensity: 0.6, wireframe: true })
      );
      moleculeGroup.add(centerCore);

      for (let i = 0; i < 24; i++) {
        const phi = Math.acos(-1 + (2 * i) / 24);
        const theta = Math.sqrt(24 * Math.PI) * phi;
        const radius = 5.5;

        const x = radius * Math.cos(theta) * Math.sin(phi);
        const y = radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(phi);

        const atom = new THREE.Mesh(
          sphereGeo,
          new THREE.MeshStandardMaterial({ color: i % 2 === 0 ? 0x00e5ff : 0xff6b9d })
        );
        atom.position.set(x, y, z);
        moleculeGroup.add(atom);

        // Cylinder connector to core
        const cylinder = new THREE.Mesh(
          new THREE.CylinderGeometry(0.06, 0.06, radius, 8),
          new THREE.MeshBasicMaterial({ color: 0x4da8ff, wireframe: true })
        );
        cylinder.position.set(x / 2, y / 2, z / 2);
        cylinder.lookAt(new THREE.Vector3(x, y, z));
        cylinder.rotateX(Math.PI / 2);
        moleculeGroup.add(cylinder);
      }
    };

    // Initial build based on mode
    if (mode === "double-helix") buildDoubleHelix();
    else if (mode === "alpha-helix") buildAlphaHelix();
    else buildBindingPocket();

    // Mouse Drag Orbit Controls
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

      moleculeGroup.rotation.y += deltaX * 0.01;
      moleculeGroup.rotation.x += deltaY * 0.01;

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

    // Animation Render Loop
    let reqId: number;
    const animate = () => {
      reqId = requestAnimationFrame(animate);

      if (autoRotate && !isDragging && !isReducedMotion && moleculeGroup) {
        moleculeGroup.rotation.y += 0.008;
        moleculeGroup.rotation.x += 0.003;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      renderer.dispose();
    };
  }, [mode, autoRotate, isReducedMotion]);

  const handleModeChange = (newMode: MoleculeMode) => {
    soundManager.playClickSound();
    setMode(newMode);
    if (newMode === "double-helix") setActiveAtomInfo("P-8849 [DOUBLE HELIX BACKBONE]");
    else if (newMode === "alpha-helix") setActiveAtomInfo("VAL-104 [ALPHA HELIX FOLD]");
    else setActiveAtomInfo("KD-0.38nM [LIGAND BINDING POCKET]");
  };

  return (
    <div ref={containerRef} className={`relative w-full h-[400px] md:h-[480px] rounded-3xl overflow-hidden glass-panel border border-border flex flex-col justify-between p-6 ${className}`}>
      {/* Top Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent-lime animate-ping" />
          <span className="font-mono text-xs text-accent-lime font-bold uppercase tracking-widest">
            // THREE.JS 3D MOLECULAR VIEWER
          </span>
        </div>

        <div className="flex items-center gap-1.5 bg-surface-elevated/90 p-1 rounded-full border border-border">
          <button
            onClick={() => handleModeChange("double-helix")}
            className={`px-3 py-1 rounded-full font-mono text-[11px] uppercase transition-all ${
              mode === "double-helix" ? "bg-accent-lime text-void font-bold" : "text-ink-muted hover:text-ink"
            }`}
          >
            Helix 3D
          </button>
          <button
            onClick={() => handleModeChange("alpha-helix")}
            className={`px-3 py-1 rounded-full font-mono text-[11px] uppercase transition-all ${
              mode === "alpha-helix" ? "bg-accent-cyan text-void font-bold" : "text-ink-muted hover:text-ink"
            }`}
          >
            Alpha Fold
          </button>
          <button
            onClick={() => handleModeChange("binding-pocket")}
            className={`px-3 py-1 rounded-full font-mono text-[11px] uppercase transition-all ${
              mode === "binding-pocket" ? "bg-accent-pink text-void font-bold" : "text-ink-muted hover:text-ink"
            }`}
          >
            Pocket 3D
          </button>
        </div>
      </div>

      {/* Main 3D Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-0" />

      {/* Bottom Control & Status Overlay */}
      <div className="flex flex-wrap items-center justify-between gap-4 z-10 pt-4 border-t border-border/60 bg-surface/40 backdrop-blur-md px-4 py-3 rounded-2xl">
        <div className="flex items-center gap-2 font-mono text-xs text-ink-muted">
          <Eye className="w-4 h-4 text-accent-cyan" />
          <span className="text-ink font-semibold">{activeAtomInfo}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-ink-muted hidden sm:inline">
            DRAG TO ROTATE 3D MODEL
          </span>

          <button
            onClick={() => {
              soundManager.playClickSound();
              setAutoRotate(!autoRotate);
            }}
            className={`p-2 rounded-xl border border-border transition-all ${
              autoRotate ? "bg-accent-lime/20 text-accent-lime border-accent-lime/50" : "bg-surface-elevated text-ink-muted"
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
