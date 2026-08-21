"use client";

import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import {
  RotateCcw,
  Sparkles,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Atom,
  Box,
  Eye,
} from "lucide-react";

export type MolecularStructureType = "helix" | "sheet" | "complex" | "binding_pocket";
export type RenderStyle = "ribbon" | "ball_stick" | "surface" | "backbone";

interface MolecularViewer3DProps {
  structureType?: MolecularStructureType;
  title?: string;
}

export const MolecularViewer3D: React.FC<MolecularViewer3DProps> = ({
  structureType: initialStructure = "helix",
  title = "3D Molecular Spatial Viewer",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [structure, setStructure] = useState<MolecularStructureType>(initialStructure);
  const [renderStyle, setRenderStyle] = useState<RenderStyle>("ball_stick");
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [atomCount, setAtomCount] = useState<number>(142);
  const [rmsdResolution, setRmsdResolution] = useState<string>("0.38Å");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 32;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);

    // Empty container and append canvas
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 2.5);
    dirLight1.position.set(15, 20, 15);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x818cf8, 2.0);
    dirLight2.position.set(-15, -20, -10);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xa855f7, 3, 50);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight);

    // Group for rotating structure
    const moleculeGroup = new THREE.Group();
    scene.add(moleculeGroup);

    // Generate Molecular Geometries based on Structure and Style
    const atomMaterials = {
      carbon: new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.2, metalness: 0.4 }),
      nitrogen: new THREE.MeshStandardMaterial({ color: 0x6366f1, roughness: 0.2, metalness: 0.4 }),
      oxygen: new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.2, metalness: 0.4 }),
      hydrogen: new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3, metalness: 0.1 }),
      sulfur: new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.2, metalness: 0.4 }),
    };

    const bondMaterial = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.4,
      metalness: 0.6,
      transparent: true,
      opacity: 0.8,
    });

    const sphereGeo = new THREE.SphereGeometry(
      renderStyle === "surface" ? 1.4 : renderStyle === "ball_stick" ? 0.6 : 0.35,
      16,
      16
    );

    const points: THREE.Vector3[] = [];
    const numResidues = structure === "helix" ? 48 : structure === "complex" ? 64 : 36;
    setAtomCount(numResidues * 4);

    for (let i = 0; i < numResidues; i++) {
      const t = (i / numResidues) * Math.PI * 8;
      let pos: THREE.Vector3;

      if (structure === "helix") {
        const radius = 5.5;
        const y = (i - numResidues / 2) * 0.45;
        pos = new THREE.Vector3(Math.cos(t) * radius, y, Math.sin(t) * radius);
      } else if (structure === "sheet") {
        const x = (i % 6 - 2.5) * 2.8;
        const y = Math.floor(i / 6 - 3) * 2.2;
        const z = Math.sin(i * 0.5) * 1.5;
        pos = new THREE.Vector3(x, y, z);
      } else if (structure === "binding_pocket") {
        const phi = Math.acos(-1 + (2 * i) / numResidues);
        const theta = Math.sqrt(numResidues * Math.PI) * phi;
        const r = 6 + Math.sin(i * 3) * 1.2;
        pos = new THREE.Vector3(
          r * Math.cos(theta) * Math.sin(phi),
          r * Math.sin(theta) * Math.sin(phi),
          r * Math.cos(phi)
        );
      } else {
        // Complex double helix
        const y = (i - numResidues / 2) * 0.4;
        pos = new THREE.Vector3(Math.cos(t) * 6, y, Math.sin(t) * 6);
      }

      points.push(pos);

      // Create Atom Sphere
      const matKeys = Object.keys(atomMaterials) as (keyof typeof atomMaterials)[];
      const mat = atomMaterials[matKeys[i % matKeys.length]];
      const atomMesh = new THREE.Mesh(sphereGeo, mat);
      atomMesh.position.copy(pos);
      moleculeGroup.add(atomMesh);

      // Create Bonds between sequential residues
      if (i > 0 && renderStyle !== "surface") {
        const prevPos = points[i - 1];
        const dist = prevPos.distanceTo(pos);
        const bondGeo = new THREE.CylinderGeometry(0.12, 0.12, dist, 8);
        const bondMesh = new THREE.Mesh(bondGeo, bondMaterial);

        const midpoint = new THREE.Vector3().addVectors(prevPos, pos).multiplyScalar(0.5);
        bondMesh.position.copy(midpoint);

        const direction = new THREE.Vector3().subVectors(pos, prevPos).normalize();
        const axis = new THREE.Vector3(0, 1, 0);
        const quaternion = new THREE.Quaternion().setFromUnitVectors(axis, direction);
        bondMesh.setRotationFromQuaternion(quaternion);

        moleculeGroup.add(bondMesh);
      }
    }

    // Ribbon curve tube
    if (renderStyle === "ribbon" && points.length > 2) {
      const curve = new THREE.CatmullRomCurve3(points);
      const tubeGeo = new THREE.TubeGeometry(curve, 100, 0.45, 12, false);
      const ribbonMat = new THREE.MeshStandardMaterial({
        color: 0x8b5cf6,
        roughness: 0.2,
        metalness: 0.5,
      });
      const tubeMesh = new THREE.Mesh(tubeGeo, ribbonMat);
      moleculeGroup.add(tubeMesh);
    }

    // Animation Loop
    let animationFrameId: number;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const animate = () => {
      if (isRotating && !prefersReducedMotion) {
        moleculeGroup.rotation.y += 0.008;
        moleculeGroup.rotation.x += 0.003;
      }
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Mouse Interaction
    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      moleculeGroup.rotation.y += deltaX * 0.01;
      moleculeGroup.rotation.x += deltaY * 0.01;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    // Resize Observer
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      dom.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, [structure, renderStyle, isRotating]);

  return (
    <div className="rounded-2xl bg-surface/80 backdrop-blur-2xl border border-border overflow-hidden shadow-2xl flex flex-col">
      {/* Top Controls Header */}
      <div className="p-4 border-b border-border bg-surface-elevated/60 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-accent-cyan">
            <Atom className="w-5 h-5 animate-spin-20s" />
          </div>
          <div>
            <h3 className="text-sm font-display font-bold text-ink">{title}</h3>
            <p className="text-xs font-mono text-ink-muted">
              Spatial Resolution: <span className="text-emerald-400 font-bold">{rmsdResolution} RMSD</span> · Atoms:{" "}
              <span className="text-accent-cyan font-bold">{atomCount}</span>
            </p>
          </div>
        </div>

        {/* Structure Selector */}
        <div className="flex items-center gap-2">
          <select
            value={structure}
            onChange={(e) => setStructure(e.target.value as MolecularStructureType)}
            className="px-3 py-1.5 rounded-xl bg-void border border-border text-xs font-mono text-ink focus:outline-none focus:border-accent-blue"
          >
            <option value="helix">Alpha Helix (PDB: 1ALH)</option>
            <option value="sheet">Beta Sheet Motif (PDB: 2BTA)</option>
            <option value="complex">Double Helix DNA (PDB: 1BNA)</option>
            <option value="binding_pocket">KRAS-G12D Binding Pocket</option>
          </select>

          {/* Render Style Mode */}
          <div className="flex items-center rounded-xl bg-surface-elevated p-1 border border-white/5">
            {(["ball_stick", "ribbon", "surface"] as RenderStyle[]).map((style) => (
              <button
                key={style}
                onClick={() => setRenderStyle(style)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono capitalize transition-colors ${
                  renderStyle === style
                    ? "bg-blue-600 text-white font-semibold shadow-md"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {style.replace("_", " & ")}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`p-2 rounded-xl border transition-colors ${
              isRotating
                ? "bg-accent-cyan/20 border-accent-cyan text-accent-cyan"
                : "bg-surface-elevated border-white/10 text-ink-muted"
            }`}
            title="Toggle Auto Rotation"
          >
            <RotateCcw className={`w-4 h-4 ${isRotating ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* WebGL Canvas Viewport */}
      <div
        ref={containerRef}
        className="w-full h-[460px] relative bg-void cursor-grab active:cursor-grabbing overflow-hidden"
      >
        {/* Background Cyber Blueprint Grid */}
        <div className="absolute inset-0 bg-blueprint-schematic opacity-20 pointer-events-none" />

        {/* Floating Telemetry Badge */}
        <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-surface/80 backdrop-blur-xl border border-white/10 text-[11px] font-mono space-y-1 pointer-events-none">
          <div className="text-accent-cyan font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
            Active GPU Shaders: WebGL 2.0
          </div>
          <div className="text-ink-muted">Backbone: De Novo Diffusion-3D</div>
          <div className="text-ink-muted">Orbital Drag: Enabled (L-Click + Drag)</div>
        </div>
      </div>
    </div>
  );
};
