import React, { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import {
  RotateCcw,
  Layers,
  Palette,
  Sparkles,
  Check,
  Wind,
  Disc,
  Eye,
  Film,
  Box,
  Play,
  Pause,
  ZoomIn,
  Sliders,
  Copy,
} from "lucide-react";
import { ErrorBoundary } from "./ErrorBoundary";
import modelVideoSrc from "../assets/model-silk-flow.mp4";

// ============================================================================
// PROCEDURAL PROCEDURAL WEAVE BUMP & NORMAL MAPS (Clear Fabric Differentiation)
// ============================================================================
function generateFabricBumpMap(type: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;

  // Base neutral gray
  ctx.fillStyle = "#808080";
  ctx.fillRect(0, 0, 256, 256);

  if (type === "cashmere-knit") {
    // 16 Gauge 2-Ply Knitted Rib Wales & Interlocking Loops
    ctx.fillStyle = "#a8a8a8";
    for (let x = 0; x < 256; x += 12) {
      ctx.fillRect(x, 0, 6, 256);
    }
    // Knit loops
    ctx.strokeStyle = "#505050";
    ctx.lineWidth = 2.0;
    for (let y = 0; y < 256; y += 12) {
      for (let x = 0; x < 256; x += 12) {
        ctx.beginPath();
        ctx.arc(x + 6, y + 6, 4, 0, Math.PI);
        ctx.stroke();
      }
    }
  } else if (type === "french-terry") {
    // 290 GSM Cotton Looper: Diagonal Weft + Coiled Loops
    ctx.strokeStyle = "#484848";
    ctx.lineWidth = 3.0;
    for (let i = -256; i < 512; i += 16) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + 256, 256);
      ctx.stroke();
    }
    // Terry loop clusters
    for (let i = 0; i < 400; i++) {
      const rx = Math.random() * 256;
      const ry = Math.random() * 256;
      ctx.fillStyle = Math.random() > 0.5 ? "#686868" : "#989898";
      ctx.beginPath();
      ctx.arc(rx, ry, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (type === "linen-voile") {
    // 140 GSM Crinkled Silk Linen Voile: Organic Slub Fissures & Crepe Texture
    for (let i = 0; i < 256; i += 4) {
      const alpha = 0.4 + Math.random() * 0.5;
      ctx.strokeStyle = `rgba(${70 + Math.random() * 80}, ${70 + Math.random() * 80}, ${70 + Math.random() * 80}, ${alpha})`;
      ctx.lineWidth = 1.0 + Math.random() * 2.2;
      ctx.beginPath();
      ctx.moveTo(0, i + (Math.random() - 0.5) * 4);
      ctx.lineTo(256, i + (Math.random() - 0.5) * 4);
      ctx.stroke();
    }
    for (let i = 0; i < 256; i += 6) {
      ctx.strokeStyle = `rgba(140, 140, 140, 0.5)`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(i + (Math.random() - 0.5) * 3, 0);
      ctx.lineTo(i + (Math.random() - 0.5) * 3, 256);
      ctx.stroke();
    }
  } else if (type === "heavy-satin") {
    // 220 GSM Heavy Liquid Satin: Smooth 4/1 Twill Float Grain
    ctx.strokeStyle = "#909090";
    ctx.lineWidth = 1.0;
    for (let i = -256; i < 512; i += 8) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + 256, 256);
      ctx.stroke();
    }
  } else {
    // 19 Momme Silk Charmeuse: Microscopic Pristine Filament (Ultrafine)
    const img = ctx.getImageData(0, 0, 256, 256);
    for (let i = 0; i < img.data.length; i += 4) {
      const n = (Math.random() - 0.5) * 4;
      img.data[i] += n;
      img.data[i + 1] += n;
      img.data[i + 2] += n;
    }
    ctx.putImageData(img, 0, 0);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(
    type === "cashmere-knit" ? 14 : type === "french-terry" ? 10 : type === "linen-voile" ? 8 : 6,
    type === "cashmere-knit" ? 14 : type === "french-terry" ? 10 : type === "linen-voile" ? 8 : 6
  );
  return texture;
}

// ============================================================================
// 3D REAL-MODEL SILHOUETTE & BILLOWING SILK CAPE (Inspired by Editorial Reference)
// ============================================================================
interface Model3DSceneProps {
  color: string;
  wireframe: boolean;
  fabricType: string;
  windSpeed: number;
}

const EditorialModelStudio: React.FC<Model3DSceneProps> = ({
  color,
  wireframe,
  fabricType,
  windSpeed,
}) => {
  const capeMeshRef = useRef<THREE.Mesh>(null);
  const bodiceMeshRef = useRef<THREE.Mesh>(null);

  // Generate procedural bump texture for active fabric
  const fabricBumpTexture = useMemo(() => generateFabricBumpMap(fabricType), [fabricType]);

  // Distinct wave physics and frequency based on fabric GSM & type
  const waveParams = useMemo(() => {
    switch (fabricType) {
      case "silk-charmeuse": // 19 Momme (~82 GSM): Fast, light fluttering waves
        return { speed: 2.6, amp: 0.055, freqX: 5.5, freqY: 4.2, flutter: 0.025 };
      case "heavy-satin": // 220 GSM: Deep, heavy, majestic parabolic billows
        return { speed: 1.2, amp: 0.085, freqX: 2.8, freqY: 2.2, flutter: 0.012 };
      case "cashmere-knit": // 240 GSM: Soft, rounded, pillowy breathing
        return { speed: 1.4, amp: 0.035, freqX: 3.2, freqY: 2.5, flutter: 0.008 };
      case "french-terry": // 290 GSM Cotton Looper: Stiff, structural drop with low flutter
        return { speed: 0.9, amp: 0.022, freqX: 2.2, freqY: 1.8, flutter: 0.005 };
      case "linen-voile": // 140 GSM: Agitated, airy crinkle fluttering
        return { speed: 3.0, amp: 0.048, freqX: 7.0, freqY: 5.0, flutter: 0.032 };
      default:
        return { speed: 2.0, amp: 0.05, freqX: 4.0, freqY: 3.0, flutter: 0.015 };
    }
  }, [fabricType]);

  // Multi-harmonic vertex wave simulation for the billowing cape
  useFrame((state) => {
    const time = state.clock.getElapsedTime() * (1 + windSpeed * 0.4) * waveParams.speed;

    if (capeMeshRef.current && capeMeshRef.current.geometry) {
      const pos = capeMeshRef.current.geometry.attributes.position;
      if (!capeMeshRef.current.userData.initialZ) {
        const arr = new Float32Array(pos.count);
        for (let i = 0; i < pos.count; i++) arr[i] = pos.getZ(i);
        capeMeshRef.current.userData.initialZ = arr;
      }
      const initialZ = capeMeshRef.current.userData.initialZ;

      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        // Multi-harmonic aerodynamic wave
        const primary = Math.sin(x * waveParams.freqX + time) * waveParams.amp;
        const secondary = Math.cos(y * waveParams.freqY + time * 1.3) * (waveParams.amp * 0.6);
        const flutter = Math.sin((x + y) * 9.0 + time * 2.5) * waveParams.flutter * windSpeed;
        pos.setZ(i, initialZ[i] + (primary + secondary + flutter) * windSpeed);
      }
      pos.needsUpdate = true;
    }
  });

  // Physical PBR material specifications dynamically configured per fabric
  const materialProps = useMemo(() => {
    switch (fabricType) {
      case "silk-charmeuse": // Mirror gloss, intense sheen, liquid surface
        return {
          roughness: 0.08,
          metalness: 0.04,
          clearcoat: 1.0,
          clearcoatRoughness: 0.05,
          sheen: 1.0,
          sheenRoughness: 0.12,
          sheenColor: new THREE.Color(color).offsetHSL(0, 0.15, 0.2),
          bumpScale: 0.008,
        };
      case "heavy-satin": // Dense pearlescent luster, sculptural reflections
        return {
          roughness: 0.16,
          metalness: 0.08,
          clearcoat: 0.9,
          clearcoatRoughness: 0.1,
          sheen: 0.95,
          sheenRoughness: 0.25,
          sheenColor: new THREE.Color(color).offsetHSL(0, 0.08, 0.12),
          bumpScale: 0.02,
        };
      case "cashmere-knit": // Knitted rib texture, soft matte micro-fiber halo
        return {
          roughness: 0.82,
          metalness: 0.0,
          clearcoat: 0.0,
          clearcoatRoughness: 0.0,
          sheen: 0.85,
          sheenRoughness: 0.65,
          sheenColor: new THREE.Color(color).offsetHSL(0, -0.05, 0.1),
          bumpScale: 0.065,
        };
      case "french-terry": // 290 GSM Cotton Looper: 100% matte, visible diagonal loop wale
        return {
          roughness: 0.95,
          metalness: 0.0,
          clearcoat: 0.0,
          clearcoatRoughness: 0.0,
          sheen: 0.1,
          sheenRoughness: 0.9,
          sheenColor: new THREE.Color(color),
          bumpScale: 0.08,
        };
      case "linen-voile": // Crinkled slub linen: semi-sheer, organic paper-silk hand
        return {
          roughness: 0.65,
          metalness: 0.02,
          clearcoat: 0.25,
          clearcoatRoughness: 0.35,
          sheen: 0.45,
          sheenRoughness: 0.4,
          sheenColor: new THREE.Color(color).offsetHSL(0, 0.05, 0.15),
          bumpScale: 0.075,
          transparent: true,
          opacity: 0.94,
        };
      default:
        return {
          roughness: 0.2,
          metalness: 0.05,
          clearcoat: 0.8,
          sheen: 0.8,
          bumpScale: 0.02,
        };
    }
  }, [fabricType, color]);

  return (
    <group position={[0, -0.6, 0]}>
      {/* ================= EDITORIAL MODEL SILHOUETTE ================= */}
      {/* Head with sleek chignon bun matching the Pixabay reference model */}
      <mesh position={[0, 2.05, 0]} castShadow>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial color="#cbb39e" roughness={0.7} />
      </mesh>
      {/* Sleek low hair bun */}
      <mesh position={[0, 2.08, -0.21]} castShadow>
        <sphereGeometry args={[0.11, 24, 24]} />
        <meshStandardMaterial color="#1a1410" roughness={0.9} />
      </mesh>
      {/* Slender neck */}
      <mesh position={[0, 1.78, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.12, 0.38, 24]} />
        <meshStandardMaterial color="#cbb39e" roughness={0.7} />
      </mesh>
      {/* Sculpted shoulders & clavicle */}
      <mesh position={[0, 1.58, 0]} castShadow>
        <cylinderGeometry args={[0.42, 0.38, 0.15, 32]} />
        <meshStandardMaterial color="#cbb39e" roughness={0.7} />
      </mesh>
      {/* Graceful arms held lightly at sides in high-fashion pose */}
      <mesh position={[-0.48, 1.15, 0.04]} rotation={[0, 0, 0.12]} castShadow>
        <cylinderGeometry args={[0.075, 0.06, 0.95, 20]} />
        <meshStandardMaterial color="#cbb39e" roughness={0.7} />
      </mesh>
      <mesh position={[0.48, 1.15, 0.04]} rotation={[0, 0, -0.12]} castShadow>
        <cylinderGeometry args={[0.075, 0.06, 0.95, 20]} />
        <meshStandardMaterial color="#cbb39e" roughness={0.7} />
      </mesh>
      {/* Slender lower torso & column gown base */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.34, 0.48, 1.3, 32]} />
        <meshPhysicalMaterial
          color={color}
          bumpMap={fabricBumpTexture}
          wireframe={wireframe}
          side={THREE.DoubleSide}
          {...materialProps}
        />
      </mesh>

      {/* ================= STRAPLESS DRAPED SILK BODICE ================= */}
      <mesh ref={bodiceMeshRef} position={[0, 1.25, 0.02]} castShadow receiveShadow>
        <cylinderGeometry args={[0.38, 0.33, 0.72, 48, 24]} />
        <meshPhysicalMaterial
          color={color}
          bumpMap={fabricBumpTexture}
          wireframe={wireframe}
          side={THREE.DoubleSide}
          {...materialProps}
        />
      </mesh>

      {/* Pleated Couture Waist Sash */}
      <mesh position={[0, 0.9, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.35, 0.04, 16, 48]} />
        <meshPhysicalMaterial
          color={color}
          bumpMap={fabricBumpTexture}
          wireframe={wireframe}
          {...materialProps}
        />
      </mesh>

      {/* ================= BILLOWING SILK CAPE / WING ================= */}
      {/* Expansive flowing fabric cape catching the wind behind her (Pixabay reference) */}
      <mesh
        ref={capeMeshRef}
        position={[0.75, 1.25, -0.2]}
        rotation={[0.1, -0.25, 0.05]}
        castShadow
        receiveShadow
      >
        <planeGeometry args={[2.4, 1.9, 64, 48]} />
        <meshPhysicalMaterial
          color={color}
          bumpMap={fabricBumpTexture}
          wireframe={wireframe}
          side={THREE.DoubleSide}
          {...materialProps}
        />
      </mesh>
    </group>
  );
};

// ============================================================================
// MAIN COMPONENT: REAL-MODEL & 3D FABRIC ATELIER STUDIO
// ============================================================================
interface ThreeGarmentViewerProps {
  theme?: "dark" | "light";
}

export const ThreeGarmentViewer: React.FC<ThreeGarmentViewerProps> = ({ theme = "dark" }) => {
  const [viewMode, setViewMode] = useState<"video" | "3d">("video");
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [activeColorHex, setActiveColorHex] = useState<string>("#1B5E4A"); // Malachite Green
  const [activeFabric, setActiveFabric] = useState<string>("silk-charmeuse");
  const [windSpeed, setWindSpeed] = useState<number>(1.5);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const isLight = theme === "light";

  // Style Union Signature Pantone Swatches
  const colorways = [
    { name: "Malachite Green", code: "19-5421 TPX", hex: "#1B5E4A", mood: "Haute Emerald" },
    { name: "Apricot Crush", code: "15-1247 TPX", hex: "#F4845F", mood: "Warm Radiant" },
    { name: "Cannoli Cream", code: "11-4302 TPX", hex: "#E8E2D5", mood: "Pristine Luxury" },
    { name: "Astro Dust", code: "17-1537 TPX", hex: "#9E4748", mood: "Deep Crimson" },
    { name: "Tidal Teal", code: "19-4324 TPX", hex: "#1B5B6E", mood: "Oceanic Twilight" },
    { name: "Moonless Night", code: "19-4203 TPG", hex: "#181A1E", mood: "Midnight Noir" },
    { name: "Adriatic Sea", code: "17-4440 TCX", hex: "#3A99D8", mood: "Cerulean Coast" },
    { name: "Sweet Mandarin", code: "16-1356 TPX", hex: "#E86F2D", mood: "Zesty Sunset" },
  ];

  // 5 Clear, Distinctive Fabric Types with Real GSM & Optical Attributes
  const fabrics = [
    {
      id: "silk-charmeuse",
      name: "Mulberry Silk Charmeuse",
      weight: "19 Momme (~82 GSM)",
      gsm: 82,
      drapeFluidity: 98,
      surfaceSheen: 96,
      structure: "Ultra-fine filament silk with mirror-like liquid luster & rapid fluttering waves.",
      handfeel: "Buttery, cool glide, featherweight evening drape.",
      macroPattern: "liquid-mirror",
      playbackRate: 1.1,
    },
    {
      id: "heavy-satin",
      name: "Heavy Liquid Satin",
      weight: "220 GSM",
      gsm: 220,
      drapeFluidity: 84,
      surfaceSheen: 92,
      structure: "Dense 4/1 twill float weave casting deep sculptural valleys & pearlescent highlights.",
      handfeel: "Substantial, liquid-heavy roll with majestic slow billows.",
      macroPattern: "satin-twill",
      playbackRate: 0.88,
    },
    {
      id: "cashmere-knit",
      name: "Cashmere-Silk Knit",
      weight: "16 Gauge 2-Ply (~240 GSM)",
      gsm: 240,
      drapeFluidity: 68,
      surfaceSheen: 32,
      structure: "Micro-ribbed interlocking loops with soft matte halo and tactile knit wales.",
      handfeel: "Ultra-soft, pillowy warmth, rounded gentle drape.",
      macroPattern: "knitted-rib",
      playbackRate: 0.95,
    },
    {
      id: "french-terry",
      name: "Cotton Looper (Uniset)",
      weight: "290 GSM",
      gsm: 290,
      drapeFluidity: 42,
      surfaceSheen: 8,
      structure: "Style Union signature 100% combed cotton looper with diagonal reverse coils and 100% matte face.",
      handfeel: "Structured streetwear body, firm architectural creases, non-reflective.",
      macroPattern: "looper-diagonal",
      playbackRate: 0.9,
    },
    {
      id: "linen-voile",
      name: "Crinkled Silk Linen Voile",
      weight: "140 GSM",
      gsm: 140,
      drapeFluidity: 76,
      surfaceSheen: 45,
      structure: "Semi-sheer open weave with organic slub fissures, crinkled crepe texture, and airy agitation.",
      handfeel: "Dry, tactile paper-silk hand, breezy and breathable.",
      macroPattern: "linen-slub",
      playbackRate: 1.15,
    },
  ];

  const activeColorObj = colorways.find((c) => c.hex === activeColorHex) || colorways[0];
  const activeFabricObj = fabrics.find((f) => f.id === activeFabric) || fabrics[0];

  // Adjust video playback rate according to fabric weight for realism
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = activeFabricObj.playbackRate * (0.8 + windSpeed * 0.15);
    }
  }, [activeFabricObj, windSpeed]);

  const copyHex = () => {
    navigator.clipboard.writeText(activeColorObj.hex);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section
      id="atelier"
      className={`relative w-full py-24 sm:py-32 px-4 sm:px-8 border-t transition-colors duration-500 overflow-hidden ${
        isLight
          ? "bg-[#f5f6f8] border-black/10 text-neutral-900"
          : "bg-[#0b0d10] border-white/10 text-white"
      }`}
    >
      {/* Ambient dynamic color glow matching selected Pantone shade */}
      <div
        className="absolute top-1/4 -left-40 w-96 h-96 rounded-full blur-[160px] pointer-events-none opacity-30 transition-all duration-700"
        style={{ backgroundColor: activeColorHex }}
      />
      <div
        className="absolute bottom-1/4 -right-40 w-96 h-96 rounded-full blur-[160px] pointer-events-none opacity-30 transition-all duration-700"
        style={{ backgroundColor: activeColorHex }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-500 font-mono mb-2">
              <Sparkles size={14} />
              <span>Real-Model Draping Atelier &amp; 3D Textile Studio</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-anton tracking-tight uppercase">
              FLUID SILK ATELIER
            </h2>
            <p className={`text-sm mt-2 max-w-xl leading-relaxed ${isLight ? "text-neutral-600" : "text-white/60"}`}>
              Experience real high-fashion silk draping with dynamic aerodynamic motion. Switch between the 
              <strong> Real Model Runway Film</strong> and <strong>Interactive 3D Orbit</strong>, testing distinctive fabrics and Style Union Pantone swatches.
            </p>
          </div>

          {/* Dual View Mode Switcher (Runway Film vs 3D Simulation) */}
          <div className="flex items-center gap-3">
            <div
              className={`p-1.5 rounded-full border backdrop-blur-xl flex items-center gap-1 shadow-lg ${
                isLight ? "bg-white/80 border-black/10" : "bg-black/60 border-white/15"
              }`}
            >
              <button
                onClick={() => setViewMode("video")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-bold uppercase transition-all duration-300 cursor-pointer ${
                  viewMode === "video"
                    ? "bg-white text-black shadow-md"
                    : isLight
                    ? "text-neutral-600 hover:text-black"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <Film size={14} />
                <span>Runway Film</span>
              </button>
              <button
                onClick={() => setViewMode("3d")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-bold uppercase transition-all duration-300 cursor-pointer ${
                  viewMode === "3d"
                    ? "bg-emerald-500 text-black shadow-md shadow-emerald-500/25"
                    : isLight
                    ? "text-neutral-600 hover:text-black"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <Box size={14} />
                <span>3D Interactive</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Stage & Studio Controls Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Main Viewport (Takes 8 columns) */}
          <div
            className={`lg:col-span-8 border rounded-3xl overflow-hidden relative min-h-[520px] sm:min-h-[640px] flex items-center justify-center shadow-2xl transition-all ${
              isLight
                ? "bg-[#e8ebf0] border-black/10 shadow-black/10"
                : "bg-[#101217] border-white/15 shadow-black/60"
            }`}
          >
            {viewMode === "video" ? (
              /* ================= MODE 1: REAL MODEL RUNWAY FILM ================= */
              <div className="w-full h-full relative flex items-center justify-center overflow-hidden bg-black select-none">
                {/* Real Model High-Fashion Video Stream */}
                <video
                  ref={videoRef}
                  src={modelVideoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover object-center transition-all duration-700 pointer-events-none"
                />

                {/* Graceful Dynamic Color Overlay for Selected Pantone Hue */}
                <div
                  className="absolute inset-0 pointer-events-none transition-all duration-700 ease-out"
                  style={{
                    backgroundColor: activeColorHex,
                    mixBlendMode: "color",
                    opacity: 0.85,
                  }}
                />

                {/* Deep Shading Tone Adjustment (Preserving Highlights and Shadow Folds) */}
                <div
                  className="absolute inset-0 pointer-events-none transition-all duration-700 ease-out"
                  style={{
                    backgroundColor: activeColorHex,
                    mixBlendMode: "multiply",
                    opacity: 0.35,
                  }}
                />

                {/* Tactile Surface Sheen & Texture Overlay per Fabric Type */}
                {activeFabric === "cashmere-knit" && (
                  <div
                    className="absolute inset-0 pointer-events-none opacity-25 mix-blend-overlay"
                    style={{
                      backgroundImage: `repeating-linear-gradient(0deg, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.4) 1px, transparent 1px, transparent 4px), repeating-linear-gradient(90deg, rgba(0,0,0,0.3) 0px, rgba(0,0,0,0.3) 1px, transparent 1px, transparent 4px)`,
                    }}
                  />
                )}
                {activeFabric === "french-terry" && (
                  <div
                    className="absolute inset-0 pointer-events-none opacity-30 mix-blend-hard-light"
                    style={{
                      backgroundImage: `repeating-linear-gradient(45deg, rgba(0,0,0,0.25) 0px, rgba(0,0,0,0.25) 2px, transparent 2px, transparent 6px)`,
                    }}
                  />
                )}
                {activeFabric === "linen-voile" && (
                  <div
                    className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
                    style={{
                      backgroundImage: `radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)`,
                      backgroundSize: `6px 6px`,
                    }}
                  />
                )}
                {activeFabric === "silk-charmeuse" && (
                  <div
                    className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen"
                    style={{
                      background: `linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 60%)`,
                    }}
                  />
                )}

                {/* Editorial Vignette & Glass Badges */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                {/* Floating On-Screen Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 z-10">
                  <div className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 text-white text-xs font-mono flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span>EDITORIAL RUNWAY STREAM</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 text-white text-xs font-mono">
                    {activeFabricObj.weight}
                  </div>
                </div>

                {/* Floating Bottom Info Pill */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between z-10">
                  <div className="flex items-center gap-3 bg-black/60 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-2xl">
                    <span
                      className="w-4 h-4 rounded-full border border-white/40 shadow-sm"
                      style={{ backgroundColor: activeColorHex }}
                    />
                    <div>
                      <span className="text-xs font-bold text-white block uppercase tracking-wide">
                        {activeColorObj.name}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400">
                        {activeColorObj.code} • {activeColorObj.mood}
                      </span>
                    </div>
                  </div>

                  {/* Playback Toggle */}
                  <button
                    onClick={() => {
                      if (videoRef.current) {
                        if (isPlaying) videoRef.current.pause();
                        else videoRef.current.play();
                        setIsPlaying(!isPlaying);
                      }
                    }}
                    className="p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-xl border border-white/30 text-white transition-all cursor-pointer"
                    title={isPlaying ? "Pause Video" : "Play Video"}
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                </div>
              </div>
            ) : (
              /* ================= MODE 2: 3D INTERACTIVE ORBIT ================= */
              <div className="w-full h-full relative">
                <ErrorBoundary
                  sectionName="3D Silk Flow Simulation"
                  fallback={
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                      <div
                        className="w-24 h-24 rounded-full border-4 shadow-xl mb-4 flex items-center justify-center"
                        style={{ backgroundColor: activeColorHex }}
                      >
                        <Sparkles className="text-white" size={32} />
                      </div>
                      <h4 className="text-xl font-bold font-anton uppercase tracking-wide mb-1">
                        {activeFabricObj.name}
                      </h4>
                      <p className="text-xs font-mono text-emerald-500 mb-3">
                        {activeColorObj.name} • {activeFabricObj.weight}
                      </p>
                    </div>
                  }
                >
                  <Canvas
                    shadows
                    camera={{ position: [0, 0.7, 4.6], fov: 40 }}
                    dpr={[1, 2]}
                    className="w-full h-full cursor-grab active:cursor-grabbing"
                  >
                    <ambientLight intensity={isLight ? 0.9 : 0.6} />
                    <directionalLight
                      castShadow
                      position={[4, 6, 5]}
                      intensity={1.6}
                      shadow-mapSize={2048}
                    />
                    <directionalLight position={[-4, 4, -3]} intensity={0.9} color="#9ec5fe" />
                    <pointLight position={[0, -0.5, 2.5]} intensity={0.5} />

                    <Float speed={1.1} rotationIntensity={0.1} floatIntensity={0.15}>
                      <EditorialModelStudio
                        color={activeColorHex}
                        wireframe={wireframe}
                        fabricType={activeFabric}
                        windSpeed={windSpeed}
                      />
                    </Float>

                    <ContactShadows
                      position={[0, -1.8, 0]}
                      opacity={0.65}
                      scale={6}
                      blur={2}
                      far={4}
                    />

                    <OrbitControls
                      target={[0, 0.5, 0]}
                      enableZoom={true}
                      minDistance={2.2}
                      maxDistance={6.5}
                      maxPolarAngle={Math.PI / 1.7}
                      minPolarAngle={Math.PI / 3.8}
                      autoRotate={autoRotate}
                      autoRotateSpeed={1.0}
                    />
                  </Canvas>
                </ErrorBoundary>

                {/* 3D In-Canvas Floating Toolbar */}
                <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 z-10">
                  <button
                    onClick={() => setWireframe((w) => !w)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all backdrop-blur-xl cursor-pointer ${
                      wireframe
                        ? "bg-emerald-500 text-black font-semibold shadow-lg shadow-emerald-500/25"
                        : isLight
                        ? "bg-black/10 text-neutral-800 border border-black/10 hover:bg-black/20"
                        : "bg-black/50 text-white/80 border border-white/20 hover:bg-black/80 hover:text-white"
                    }`}
                    title="Toggle CLO 3D Wireframe Topology"
                  >
                    <Layers size={13} />
                    <span>CLO 3D Wireframe</span>
                  </button>

                  <button
                    onClick={() => setAutoRotate((r) => !r)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all backdrop-blur-xl cursor-pointer ${
                      autoRotate
                        ? isLight
                          ? "bg-black/15 text-black border border-black/20"
                          : "bg-white/20 text-white border border-white/30"
                        : isLight
                        ? "bg-black/5 text-neutral-500 border border-black/10"
                        : "bg-black/40 text-white/50 border border-white/10"
                    }`}
                    title="Toggle Turntable 360 Rotation"
                  >
                    <Disc size={13} className={autoRotate ? "animate-spin" : ""} />
                    <span>Turntable {autoRotate ? "ON" : "OFF"}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Wind Velocity Controller (Applies to both Video and 3D) */}
            <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-xl border border-white/20 px-3 py-1.5 rounded-full z-10">
              <Wind size={13} className="text-emerald-400" />
              <span className="text-[11px] font-mono text-white/70 mr-1 uppercase">Wind:</span>
              {[
                { label: "Gentle", val: 1.0 },
                { label: "Breeze", val: 1.8 },
                { label: "Gale", val: 2.8 },
              ].map((w) => (
                <button
                  key={w.label}
                  onClick={() => setWindSpeed(w.val)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all cursor-pointer ${
                    windSpeed === w.val
                      ? "bg-emerald-500 text-black font-bold"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {w.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right Control Panel: Fabric Types & Tactile Specs (Takes 4 columns) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            {/* Fabric Selection Card */}
            <div
              className={`p-6 rounded-3xl border backdrop-blur-xl transition-all ${
                isLight
                  ? "bg-white/80 border-black/10 shadow-lg shadow-black/5"
                  : "bg-[#12141a]/90 border-white/10 shadow-2xl"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Palette size={16} className="text-emerald-500" />
                  <h3 className="text-sm font-bold uppercase tracking-wider font-mono">
                    Select Textile Type
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
                  {fabrics.length} Distinct Grades
                </span>
              </div>

              {/* 5 Distinct Fabric Buttons with Clear Badges */}
              <div className="space-y-2.5">
                {fabrics.map((f) => {
                  const isSelected = activeFabric === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => setActiveFabric(f.id)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? "bg-emerald-500/10 border-emerald-500 text-white shadow-lg shadow-emerald-500/10"
                          : isLight
                          ? "bg-black/5 border-black/5 text-neutral-700 hover:bg-black/10 hover:border-black/20"
                          : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <div className="flex-1 pr-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-bold font-mono uppercase ${
                              isSelected ? "text-emerald-400" : isLight ? "text-neutral-900" : "text-white"
                            }`}
                          >
                            {f.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                              isSelected
                                ? "bg-emerald-500 text-black font-bold"
                                : isLight
                                ? "bg-black/10 text-neutral-600"
                                : "bg-white/10 text-white/60"
                            }`}
                          >
                            {f.weight}
                          </span>
                          <span className={`text-[10px] truncate ${isLight ? "text-neutral-500" : "text-white/50"}`}>
                            Fluidity: {f.drapeFluidity}% • Sheen: {f.surfaceSheen}%
                          </span>
                        </div>
                      </div>
                      {isSelected && <Check size={16} className="text-emerald-400 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Macro Weave Magnifier & Technical Specifications */}
            <div
              className={`p-6 rounded-3xl border backdrop-blur-xl transition-all ${
                isLight
                  ? "bg-white/80 border-black/10 shadow-lg shadow-black/5"
                  : "bg-[#12141a]/90 border-white/10 shadow-2xl"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <ZoomIn size={16} className="text-emerald-500" />
                  <h4 className="text-xs font-bold uppercase tracking-wider font-mono">
                    Macro Weave Magnifier (4x Zoom)
                  </h4>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">
                  {activeFabricObj.weight}
                </span>
              </div>

              {/* Physical Macro Texture Representation */}
              <div
                className="w-full h-24 rounded-2xl border relative overflow-hidden flex items-center justify-center mb-4 transition-all duration-500"
                style={{
                  backgroundColor: activeColorHex,
                  borderColor: isLight ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.2)",
                }}
              >
                {/* Pattern Graphic matching fabric type */}
                {activeFabric === "silk-charmeuse" && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" />
                )}
                {activeFabric === "heavy-satin" && (
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{
                      backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,0.3) 0px, rgba(255,255,255,0.3) 4px, transparent 4px, transparent 12px)`,
                    }}
                  />
                )}
                {activeFabric === "cashmere-knit" && (
                  <div
                    className="absolute inset-0 opacity-50"
                    style={{
                      backgroundImage: `repeating-linear-gradient(90deg, rgba(0,0,0,0.4) 0px, rgba(0,0,0,0.4) 3px, rgba(255,255,255,0.3) 3px, rgba(255,255,255,0.3) 6px)`,
                    }}
                  />
                )}
                {activeFabric === "french-terry" && (
                  <div
                    className="absolute inset-0 opacity-60"
                    style={{
                      backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.5) 2px, transparent 2px)`,
                      backgroundSize: `10px 10px`,
                    }}
                  />
                )}
                {activeFabric === "linen-voile" && (
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{
                      backgroundImage: `repeating-linear-gradient(0deg, rgba(0,0,0,0.4) 0px, rgba(0,0,0,0.4) 2px, transparent 2px, transparent 8px), repeating-linear-gradient(90deg, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.4) 2px, transparent 2px, transparent 8px)`,
                    }}
                  />
                )}

                <div className="relative z-10 px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-center">
                  <span className="text-[11px] font-bold text-white uppercase tracking-wider block font-anton">
                    {activeFabricObj.name}
                  </span>
                  <span className="text-[9px] font-mono text-emerald-400">
                    Surface Sheen: {activeFabricObj.surfaceSheen}% • Drape Fluidity: {activeFabricObj.drapeFluidity}%
                  </span>
                </div>
              </div>

              {/* Technical Description & Handfeel */}
              <p className={`text-xs leading-relaxed mb-3 ${isLight ? "text-neutral-700" : "text-white/70"}`}>
                {activeFabricObj.structure}
              </p>
              <div
                className={`p-2.5 rounded-xl text-[11px] font-mono border ${
                  isLight ? "bg-black/5 border-black/5 text-neutral-600" : "bg-white/5 border-white/10 text-white/60"
                }`}
              >
                <span className="font-bold text-emerald-500 uppercase block mb-0.5">Handfeel &amp; Form:</span>
                {activeFabricObj.handfeel}
              </div>
            </div>
          </div>
        </div>

        {/* Style Union Master Pantone Swatches Palette */}
        <div
          className={`mt-10 p-6 sm:p-8 rounded-3xl border backdrop-blur-xl transition-all ${
            isLight
              ? "bg-white/80 border-black/10 shadow-lg shadow-black/5"
              : "bg-[#12141a]/90 border-white/10 shadow-2xl"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-500 block mb-1">
                Color Harmonization
              </span>
              <h3 className="text-xl sm:text-2xl font-black font-anton uppercase tracking-wide">
                STYLE UNION SIGNATURE PANTONE PALETTE
              </h3>
            </div>
            <button
              onClick={copyHex}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono border transition-all cursor-pointer ${
                isCopied
                  ? "bg-emerald-500 text-black font-bold border-emerald-500"
                  : isLight
                  ? "bg-black/5 border-black/10 text-neutral-800 hover:bg-black/10"
                  : "bg-white/10 border-white/20 text-white hover:bg-white/20"
              }`}
            >
              {isCopied ? <Check size={14} /> : <Copy size={14} />}
              <span>{isCopied ? "COPIED TO CLIPBOARD" : `COPY ${activeColorObj.hex}`}</span>
            </button>
          </div>

          {/* 8 Clickable Pantone Swatch Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {colorways.map((swatch) => {
              const isSelected = activeColorHex === swatch.hex;
              return (
                <button
                  key={swatch.name}
                  onClick={() => setActiveColorHex(swatch.hex)}
                  className={`group relative p-3 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "ring-2 ring-emerald-400 scale-105 shadow-xl border-transparent"
                      : isLight
                      ? "bg-black/5 border-black/5 hover:border-black/20 hover:scale-102"
                      : "bg-white/5 border-white/10 hover:border-white/20 hover:scale-102"
                  }`}
                >
                  <div
                    className="w-full h-12 rounded-xl mb-2.5 shadow-inner transition-transform group-hover:scale-105"
                    style={{ backgroundColor: swatch.hex }}
                  />
                  <div className="text-[11px] font-bold font-mono truncate block" title={swatch.name}>
                    {swatch.name}
                  </div>
                  <div
                    className={`text-[9px] font-mono mt-0.5 truncate ${
                      isLight ? "text-neutral-500" : "text-white/50"
                    }`}
                  >
                    {swatch.code}
                  </div>
                  <div className="text-[9px] font-mono text-emerald-500 font-bold mt-1">
                    {swatch.hex}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};