import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { RotateCcw, Layers, Palette, Sparkles, Check, Wind, Disc, Eye } from "lucide-react";
import { ErrorBoundary } from "./ErrorBoundary";

interface DressFormSceneProps {
  color: string;
  wireframe: boolean;
  fabricType: string;
  windSpeed: number;
}

// Realistic Atelier Tailoring Dress Form (Mannequin) with Draped Silky Fabric
const TailorDressForm: React.FC<DressFormSceneProps> = ({
  color,
  wireframe,
  fabricType,
  windSpeed,
}) => {
  const clothGroupRef = useRef<THREE.Group>(null);
  const clothMeshRef = useRef<THREE.Mesh>(null);
  const clothCascadeRef = useRef<THREE.Mesh>(null);

  // Dynamic vertex animation for silky / buttery smooth cloth breathing
  useFrame((state) => {
    const time = state.clock.getElapsedTime() * (1 + windSpeed * 0.5);

    if (clothMeshRef.current && clothMeshRef.current.geometry) {
      const position = clothMeshRef.current.geometry.attributes.position;
      if (!clothMeshRef.current.userData.initialZ) {
        const arr = new Float32Array(position.count);
        for (let i = 0; i < position.count; i++) {
          arr[i] = position.getZ(i);
        }
        clothMeshRef.current.userData.initialZ = arr;
      }
      const initialZ = clothMeshRef.current.userData.initialZ;
      // Animate subtle ripples across the cloth surface
      for (let i = 0; i < position.count; i++) {
        const y = position.getY(i);
        const x = position.getX(i);
        // Soft buttery undulation
        const wave = Math.sin(y * 4 + time * 2) * 0.018 * windSpeed + Math.cos(x * 5 + time * 1.5) * 0.012 * windSpeed;
        position.setZ(i, initialZ[i] + wave);
      }
      position.needsUpdate = true;
    }

    if (clothCascadeRef.current && clothCascadeRef.current.geometry) {
      const position = clothCascadeRef.current.geometry.attributes.position;
      if (!clothCascadeRef.current.userData.initialZ) {
        const arr = new Float32Array(position.count);
        for (let i = 0; i < position.count; i++) {
          arr[i] = position.getZ(i);
        }
        clothCascadeRef.current.userData.initialZ = arr;
      }
      const initialZ = clothCascadeRef.current.userData.initialZ;
      for (let i = 0; i < position.count; i++) {
        const y = position.getY(i);
        const wave = Math.sin(y * 5 + time * 2.5) * 0.035 * windSpeed;
        position.setZ(i, initialZ[i] + wave);
      }
      position.needsUpdate = true;
    }
  });

  // Physical fabric properties based on selection
  const fabricMaterialProps = useMemo(() => {
    switch (fabricType) {
      case "silk-charmeuse":
        return {
          roughness: 0.12,
          metalness: 0.04,
          clearcoat: 0.95,
          clearcoatRoughness: 0.08,
          sheen: 1.0,
          sheenRoughness: 0.2,
          sheenColor: new THREE.Color(color).offsetHSL(0, 0.1, 0.15),
        };
      case "heavy-satin":
        return {
          roughness: 0.18,
          metalness: 0.08,
          clearcoat: 0.85,
          clearcoatRoughness: 0.12,
          sheen: 0.9,
          sheenRoughness: 0.3,
          sheenColor: new THREE.Color(color).offsetHSL(0, 0.05, 0.1),
        };
      case "cashmere-knit":
        return {
          roughness: 0.45,
          metalness: 0.02,
          clearcoat: 0.2,
          clearcoatRoughness: 0.4,
          sheen: 0.8,
          sheenRoughness: 0.6,
          sheenColor: new THREE.Color(color).offsetHSL(0, 0.05, 0.05),
        };
      case "french-terry":
        return {
          roughness: 0.65,
          metalness: 0.0,
          clearcoat: 0.05,
          clearcoatRoughness: 0.8,
          sheen: 0.3,
          sheenRoughness: 0.8,
          sheenColor: new THREE.Color(color),
        };
      case "linen-voile":
        return {
          roughness: 0.55,
          metalness: 0.01,
          clearcoat: 0.35,
          clearcoatRoughness: 0.5,
          sheen: 0.5,
          sheenRoughness: 0.5,
          sheenColor: new THREE.Color(color).offsetHSL(0, -0.05, 0.1),
        };
      default:
        return {
          roughness: 0.15,
          metalness: 0.05,
          clearcoat: 0.9,
          clearcoatRoughness: 0.1,
          sheen: 1.0,
          sheenRoughness: 0.25,
          sheenColor: new THREE.Color(color),
        };
    }
  }, [fabricType, color]);

  // Store initial Z positions for smooth wave animation
  const onClothCreated = (mesh: THREE.Mesh | null) => {
    if (mesh && mesh.geometry) {
      const position = mesh.geometry.attributes.position;
      const initialZ = new Float32Array(position.count);
      for (let i = 0; i < position.count; i++) {
        initialZ[i] = position.getZ(i);
      }
      mesh.userData.initialZ = initialZ;
    }
  };

  return (
    <group position={[0, -0.6, 0]}>
      {/* ================= ATELIER TAILORING DRESS FORM ================= */}
      
      {/* 1. Finial (Turned brass/wood top neck knob) */}
      <mesh position={[0, 2.38, 0]} castShadow>
        <sphereGeometry args={[0.13, 32, 32]} />
        <meshStandardMaterial color="#c59b27" metalness={0.85} roughness={0.25} />
      </mesh>
      <mesh position={[0, 2.22, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.19, 0.16, 32]} />
        <meshStandardMaterial color="#c59b27" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* 2. Neck Cap & Neck */}
      <mesh position={[0, 2.05, 0]}>
        <cylinderGeometry args={[0.3, 0.33, 0.28, 32]} />
        <meshStandardMaterial color="#3a2312" roughness={0.4} metalness={0.1} />
      </mesh>

      {/* 3. Mannequin Torso Body (Sculpted haute couture silhouette in natural ecru linen) */}
      {/* Upper Chest & Shoulders */}
      <mesh position={[0, 1.62, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.78, 0.98, 0.65, 48, 16]} />
        <meshStandardMaterial
          color="#dcd6c8"
          roughness={0.85}
          bumpScale={0.02}
        />
      </mesh>

      {/* Bust & Ribcage */}
      <mesh position={[0, 1.22, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.98, 0.82, 0.55, 48, 16]} />
        <meshStandardMaterial
          color="#dcd6c8"
          roughness={0.85}
        />
      </mesh>

      {/* Waist (Tapered atelier contour) */}
      <mesh position={[0, 0.88, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.82, 0.76, 0.35, 48, 16]} />
        <meshStandardMaterial
          color="#dcd6c8"
          roughness={0.85}
        />
      </mesh>

      {/* Flared Tailor Hips */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.76, 1.05, 0.65, 48, 16]} />
        <meshStandardMaterial
          color="#dcd6c8"
          roughness={0.85}
        />
      </mesh>

      {/* Base Cap of Dress Form */}
      <mesh position={[0, 0.11, 0]}>
        <cylinderGeometry args={[1.04, 0.95, 0.08, 48]} />
        <meshStandardMaterial color="#3a2312" roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Grosgrain Seam Ribbons (Center front, princess line, waist tape) */}
      <mesh position={[0, 1.05, 0.96]}>
        <boxGeometry args={[0.025, 1.9, 0.015]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.85, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.77, 0.012, 16, 48]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>

      {/* 4. Stand & Pedestal (Turned brass adjustment pole & antique cast-iron tripod) */}
      {/* Central Polished Steel / Brass Pole */}
      <mesh position={[0, -0.65, 0]} castShadow>
        <cylinderGeometry args={[0.055, 0.055, 1.6, 24]} />
        <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* Tailor's Adjustment Wing Screw */}
      <mesh position={[0.08, -0.35, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.03, 0.03, 0.16, 16]} />
        <meshStandardMaterial color="#c59b27" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Heavy Tripod Scroll Base */}
      <mesh position={[0, -1.45, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.22, 0.12, 32]} />
        <meshStandardMaterial color="#18181a" metalness={0.7} roughness={0.35} />
      </mesh>

      {/* Tripod 3 Legs */}
      {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((angle, i) => (
        <group key={i} rotation={[0, angle, 0]}>
          <mesh position={[0.45, -1.6, 0]} rotation={[0, 0, -0.32]} castShadow>
            <boxGeometry args={[0.85, 0.06, 0.08]} />
            <meshStandardMaterial color="#18181a" metalness={0.7} roughness={0.35} />
          </mesh>
          <mesh position={[0.82, -1.74, 0]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshStandardMaterial color="#c59b27" metalness={0.85} roughness={0.25} />
          </mesh>
        </group>
      ))}

      {/* ================= DRAPED SILKY / BUTTERY FABRIC ================= */}
      <group ref={clothGroupRef}>
        {/* Main Draped Bodice (Asymmetrical couture wrap with buttery sheen) */}
        <mesh
          ref={clothMeshRef}
          position={[0, 1.15, 0.04]}
          castShadow
          receiveShadow
        >
          <cylinderGeometry args={[0.82, 0.88, 1.35, 64, 32, true]} />
          <meshPhysicalMaterial
            color={color}
            wireframe={wireframe}
            side={THREE.DoubleSide}
            {...fabricMaterialProps}
          />
        </mesh>

        {/* Asymmetrical Shoulder Drape Cowl (Gathered over right shoulder) */}
        <mesh
          position={[0.32, 1.82, 0.15]}
          rotation={[0.3, -0.4, 0.6]}
          castShadow
        >
          <torusGeometry args={[0.55, 0.14, 24, 48, Math.PI * 1.2]} />
          <meshPhysicalMaterial
            color={color}
            wireframe={wireframe}
            side={THREE.DoubleSide}
            {...fabricMaterialProps}
          />
        </mesh>

        {/* Diagonal Cross-Body Pleat Fold */}
        <mesh
          position={[-0.15, 1.35, 0.94]}
          rotation={[0, 0, -0.42]}
          castShadow
        >
          <cylinderGeometry args={[0.07, 0.12, 1.15, 24]} />
          <meshPhysicalMaterial
            color={color}
            wireframe={wireframe}
            {...fabricMaterialProps}
          />
        </mesh>

        {/* Gathered Waist Sash & Ribbon Knot */}
        <mesh position={[0, 0.78, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.82, 0.08, 16, 48]} />
          <meshPhysicalMaterial
            color={color}
            wireframe={wireframe}
            {...fabricMaterialProps}
          />
        </mesh>
        <mesh position={[0.78, 0.78, 0.35]} rotation={[0.4, 0.2, -0.3]}>
          <sphereGeometry args={[0.14, 24, 24]} />
          <meshPhysicalMaterial
            color={color}
            wireframe={wireframe}
            {...fabricMaterialProps}
          />
        </mesh>

        {/* Cascading Side Train (Flowing down past the hip like buttery liquid silk) */}
        <mesh
          ref={clothCascadeRef}
          position={[0.82, 0.12, 0.25]}
          rotation={[0.1, 0.1, -0.15]}
          castShadow
          receiveShadow
        >
          <planeGeometry args={[0.75, 1.5, 32, 48]} />
          <meshPhysicalMaterial
            color={color}
            wireframe={wireframe}
            side={THREE.DoubleSide}
            {...fabricMaterialProps}
          />
        </mesh>
      </group>
    </group>
  );
};

interface ThreeGarmentViewerProps {
  theme?: "dark" | "light";
}

export const ThreeGarmentViewer: React.FC<ThreeGarmentViewerProps> = ({ theme = "dark" }) => {
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [activeColorHex, setActiveColorHex] = useState<string>("#1B5E4A"); // Malachite Green
  const [activeFabric, setActiveFabric] = useState<string>("silk-charmeuse");
  const [windSpeed, setWindSpeed] = useState<number>(1.2);

  const isLight = theme === "light";

  const colorways = [
    { name: "Malachite Green", code: "19-5421 TPX", hex: "#1B5E4A" },
    { name: "Apricot Crush", code: "15-1247 TPX", hex: "#F4845F" },
    { name: "Cannoli Cream", code: "11-4302 TPX", hex: "#E8E2D5" },
    { name: "Astro Dust", code: "17-1537 TPX", hex: "#9E4748" },
    { name: "Tidal Teal", code: "19-4324 TPX", hex: "#1B5B6E" },
    { name: "Moonless Night", code: "19-4203 TPG", hex: "#181A1E" },
    { name: "Adriatic Sea", code: "17-4440 TCX", hex: "#3A99D8" },
    { name: "Sweet Mandarin", code: "16-1356 TPX", hex: "#E86F2D" },
  ];

  const fabrics = [
    {
      id: "silk-charmeuse",
      name: "Mulberry Silk Charmeuse",
      weight: "19 Momme",
      drape: "Liquid & Buttery",
      desc: "Lustrous face, fluid drape, reflecting haute couture evening wear and resort elegance.",
    },
    {
      id: "heavy-satin",
      name: "Heavy Liquid Satin",
      weight: "220 GSM",
      drape: "Sculptural Sheen",
      desc: "Dense pearl luster with rich undulating shadow cascades and smooth highlights.",
    },
    {
      id: "cashmere-knit",
      name: "Cashmere-Silk Knit",
      weight: "16 Gauge 2-Ply",
      drape: "Ultra-Soft Micro-Sheen",
      desc: "Supple, featherlight luxury knitwear drape with tactile micro-fiber halo.",
    },
    {
      id: "french-terry",
      name: "Cotton Looper (Uniset)",
      weight: "290 GSM",
      drape: "Structured Streetwear",
      desc: "Style Union signature 100% cotton looper with clean drop and diagonal reverse loop.",
    },
    {
      id: "linen-voile",
      name: "Crinkled Silk Linen Voile",
      weight: "140 GSM",
      drape: "Artisanal Airy",
      desc: "Breathable textured weave capturing the 'Desert Nomad' and 'Bohemian Alchemist' themes.",
    },
  ];

  const activeColorObj = colorways.find((c) => c.hex === activeColorHex) || colorways[0];
  const activeFabricObj = fabrics.find((f) => f.id === activeFabric) || fabrics[0];

  return (
    <section
      id="atelier"
      className={`relative w-full py-24 sm:py-32 px-4 sm:px-8 border-t transition-colors duration-500 overflow-hidden ${
        isLight
          ? "bg-[#f5f6f8] border-black/10 text-neutral-900"
          : "bg-[#0b0d10] border-white/10 text-white"
      }`}
    >
      {/* Dynamic ambient color glow */}
      <div
        className="absolute top-1/4 -left-40 w-96 h-96 rounded-full blur-[150px] pointer-events-none opacity-25 transition-all duration-700"
        style={{ backgroundColor: activeColorHex }}
      />
      <div
        className="absolute bottom-1/4 -right-40 w-96 h-96 rounded-full blur-[150px] pointer-events-none opacity-25 transition-all duration-700"
        style={{ backgroundColor: activeColorHex }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-500 font-mono mb-2">
              <Sparkles size={14} />
              <span>Realistic Haute Couture Dress Form &amp; Fabric Studio</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-anton uppercase tracking-tight">
              3D Tailoring Dress Form Atelier
            </h2>
            <p className={`max-w-2xl text-sm sm:text-base mt-2 ${isLight ? "text-neutral-600" : "text-white/70"}`}>
              Realistic tailoring mannequin with dynamic, buttery-smooth draped fabrics. Test liquid silk charmeuse, heavy satin, cashmere knits, and Style Union 290 GSM cotton loopers with real-time cloth physics.
            </p>
          </div>

          {/* Quick Stats Glass Pill */}
          <div
            className={`flex items-center gap-4 border rounded-2xl p-3 backdrop-blur-xl fabric-twill relative overflow-hidden shadow-xl ${
              isLight
                ? "bg-white/80 border-black/10 text-neutral-900"
                : "bg-white/[0.05] border-white/15 text-white"
            }`}
          >
            <div>
              <span className={`text-[10px] uppercase font-mono block ${isLight ? "text-neutral-500" : "text-white/50"}`}>
                Current Fabric
              </span>
              <span className="text-sm font-semibold truncate block">{activeFabricObj.name}</span>
            </div>
            <div className={`h-8 w-px ${isLight ? "bg-black/10" : "bg-white/10"}`} />
            <div>
              <span className={`text-[10px] uppercase font-mono block ${isLight ? "text-neutral-500" : "text-white/50"}`}>
                Weight / Spec
              </span>
              <span className="text-sm font-mono font-bold text-emerald-500">{activeFabricObj.weight}</span>
            </div>
          </div>
        </div>

        {/* 3D Canvas & Controls Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Canvas (Takes 8 cols) */}
          <div
            className={`lg:col-span-8 border rounded-3xl overflow-hidden relative min-h-[500px] sm:min-h-[620px] flex items-center justify-center shadow-2xl transition-all ${
              isLight
                ? "bg-[#e8ebf0] border-black/10 shadow-black/10"
                : "bg-[#111319] border-white/15 shadow-black/60"
            }`}
          >
            <ErrorBoundary
              sectionName="3D Dress Form Atelier"
              fallback={
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                  <div
                    className="w-24 h-24 rounded-full border-4 shadow-xl mb-4 flex items-center justify-center transition-all duration-500"
                    style={{ backgroundColor: activeColorHex, borderColor: isLight ? "#00000020" : "#ffffff30" }}
                  >
                    <Sparkles className="text-white drop-shadow-md" size={32} />
                  </div>
                  <h4 className="text-xl font-bold font-anton uppercase tracking-wide mb-1">
                    {activeFabricObj.name}
                  </h4>
                  <p className="text-xs font-mono uppercase text-emerald-500 mb-3">
                    {activeColorObj.name} • {activeColorObj.code} • {activeFabricObj.weight}
                  </p>
                  <p className={`text-xs max-w-sm leading-relaxed ${isLight ? "text-neutral-600" : "text-white/60"}`}>
                    {activeFabricObj.desc}
                  </p>
                </div>
              }
            >
              <Canvas
                shadows
                camera={{ position: [0, 0.4, 4.4], fov: 42 }}
                dpr={[1, 2]}
                className="w-full h-full cursor-grab active:cursor-grabbing"
              >
                {/* Studio Key & Rim Lighting */}
                <ambientLight intensity={isLight ? 0.9 : 0.6} />
                <directionalLight
                  castShadow
                  position={[4, 6, 5]}
                  intensity={1.6}
                  shadow-mapSize={2048}
                />
                <directionalLight position={[-4, 4, -3]} intensity={0.8} color="#9ec5fe" />
                <pointLight position={[0, -1, 3]} intensity={0.4} />

                <Float speed={1.1} rotationIntensity={0.15} floatIntensity={0.2}>
                  <TailorDressForm
                    color={activeColorHex}
                    wireframe={wireframe}
                    fabricType={activeFabric}
                    windSpeed={windSpeed}
                  />
                </Float>

                <ContactShadows
                  position={[0, -2.3, 0]}
                  opacity={0.65}
                  scale={7}
                  blur={2}
                  far={5}
                />

                <OrbitControls
                  enableZoom={true}
                  minDistance={2.4}
                  maxDistance={7.0}
                  maxPolarAngle={Math.PI / 1.7}
                  minPolarAngle={Math.PI / 3.8}
                  autoRotate={autoRotate}
                  autoRotateSpeed={1.0}
                />
              </Canvas>
            </ErrorBoundary>

            {/* In-Canvas Floating Toolbar */}
            <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 z-10">
              <button
                onClick={() => setWireframe((w) => !w)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all backdrop-blur-xl ${
                  wireframe
                    ? "bg-emerald-500 text-black font-semibold shadow-lg shadow-emerald-500/25"
                    : isLight
                    ? "bg-black/10 text-neutral-800 border border-black/10 hover:bg-black/20"
                    : "bg-black/50 text-white/80 border border-white/20 hover:bg-black/80 hover:text-white"
                }`}
                title="Toggle Wireframe Mesh Topology"
              >
                <Layers size={13} />
                <span>{wireframe ? "Solid Silk" : "CLO 3D Wireframe"}</span>
              </button>

              <button
                onClick={() => setAutoRotate((r) => !r)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all backdrop-blur-xl ${
                  autoRotate
                    ? isLight
                      ? "bg-black/80 text-white"
                      : "bg-white/20 text-white border border-white/30"
                    : isLight
                    ? "bg-black/10 text-neutral-600 border border-black/10"
                    : "bg-black/50 text-white/60 border border-white/20 hover:text-white"
                }`}
                title="Toggle Turntable Rotation"
              >
                <RotateCcw size={13} className={autoRotate ? "animate-spin" : ""} />
                <span>{autoRotate ? "Turntable ON" : "Turntable Paused"}</span>
              </button>

              {/* Wind / Silk Flow Toggle */}
              <button
                onClick={() => setWindSpeed((s) => (s > 1.5 ? 0.4 : s + 0.8))}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all backdrop-blur-xl ${
                  isLight
                    ? "bg-black/10 text-neutral-800 border border-black/10 hover:bg-black/20"
                    : "bg-black/50 text-white/80 border border-white/20 hover:bg-black/80"
                }`}
                title="Adjust Silk Drape Breeze Intensity"
              >
                <Wind size={13} className="text-cyan-400" />
                <span>Flow: {windSpeed > 1.5 ? "Breeze" : "Gentle"}</span>
              </button>
            </div>

            {/* Bottom-left hint */}
            <div className="absolute bottom-4 left-4 z-10 pointer-events-none hidden sm:block">
              <span
                className={`text-[11px] font-mono px-3 py-1.5 rounded-xl backdrop-blur-md border ${
                  isLight
                    ? "bg-white/70 border-black/10 text-neutral-600"
                    : "bg-black/50 border-white/10 text-white/50"
                }`}
              >
                Drag to inspect dress form • Buttery silk physics simulation
              </span>
            </div>

            {/* Bottom-right Active Swatch Badge */}
            <div className="absolute bottom-4 right-4 z-10">
              <div
                className={`flex items-center gap-2 border px-3 py-1.5 rounded-2xl backdrop-blur-xl shadow-lg ${
                  isLight
                    ? "bg-white/90 border-black/10 text-neutral-900"
                    : "bg-black/70 border-white/20 text-white"
                }`}
              >
                <span
                  className="w-4 h-4 rounded-md border border-white/40 shadow-inner"
                  style={{ backgroundColor: activeColorHex }}
                />
                <div className="text-right">
                  <div className="text-[11px] font-bold leading-tight">
                    {activeColorObj.name}
                  </div>
                  <div className={`text-[9px] font-mono ${isLight ? "text-neutral-500" : "text-white/60"}`}>
                    {activeColorObj.code}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Control Panels (Takes 4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            {/* Fabric Selector Card (Glassmorphic with Fabric Background) */}
            <div
              className={`border rounded-3xl p-6 relative overflow-hidden backdrop-blur-xl shadow-xl fabric-twill ${
                isLight
                  ? "bg-white/70 border-black/10"
                  : "bg-[#14161f]/80 border-white/15"
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-4">
                <Disc size={15} className="text-emerald-500" />
                <span className="font-mono">Select Draped Fabric</span>
              </div>

              <div className="space-y-2.5">
                {fabrics.map((fab) => (
                  <button
                    key={fab.id}
                    onClick={() => setActiveFabric(fab.id)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start justify-between ${
                      activeFabric === fab.id
                        ? "bg-emerald-500/15 border-emerald-500 shadow-md"
                        : isLight
                        ? "bg-white/60 border-black/5 hover:bg-white hover:border-black/15"
                        : "bg-white/[0.02] border-white/5 hover:bg-white/[0.07] hover:border-white/20"
                    }`}
                  >
                    <div>
                      <div className="text-sm font-semibold flex items-center gap-2">
                        {fab.name}
                        {activeFabric === fab.id && (
                          <Check size={14} className="text-emerald-500" />
                        )}
                      </div>
                      <div className={`text-xs mt-0.5 line-clamp-1 ${isLight ? "text-neutral-600" : "text-white/60"}`}>
                        {fab.desc}
                      </div>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 shrink-0 ml-2">
                      {fab.weight}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Pantone Palette Card (Glassmorphic with Fabric Weave Background) */}
            <div
              className={`border rounded-3xl p-6 relative overflow-hidden backdrop-blur-xl shadow-xl fabric-herringbone ${
                isLight
                  ? "bg-white/70 border-black/10"
                  : "bg-[#14161f]/80 border-white/15"
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-4">
                <Palette size={15} className="text-emerald-500" />
                <span className="font-mono">Style Union Dye Lab Swatches</span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {colorways.map((col) => (
                  <button
                    key={col.hex}
                    onClick={() => setActiveColorHex(col.hex)}
                    title={`${col.name} - ${col.code}`}
                    className={`group relative flex flex-col p-2 rounded-xl border transition-all text-left ${
                      activeColorHex === col.hex
                        ? "border-emerald-500 ring-2 ring-emerald-500/40 bg-white/20 shadow-lg scale-105"
                        : isLight
                        ? "border-black/10 bg-white/50 hover:bg-white"
                        : "border-white/10 bg-white/[0.03] hover:bg-white/[0.09]"
                    }`}
                  >
                    <div
                      className="w-full h-8 rounded-lg mb-1.5 shadow-inner border border-black/20"
                      style={{ backgroundColor: col.hex }}
                    />
                    <span className="text-[9px] font-bold truncate block">
                      {col.name.split(" ")[0]}
                    </span>
                    <span className={`text-[8px] font-mono truncate block ${isLight ? "text-neutral-500" : "text-white/50"}`}>
                      {col.code.split(" ")[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tech Pack Navigation Banner */}
            <div
              className={`p-4 rounded-2xl border flex items-center justify-between backdrop-blur-xl fabric-mesh ${
                isLight
                  ? "bg-emerald-50 border-emerald-200 text-neutral-900"
                  : "bg-gradient-to-r from-emerald-950/40 to-teal-950/30 border-emerald-500/20 text-white"
              }`}
            >
              <div>
                <span className="text-xs font-bold block">Need Detailed Pattern Specs?</span>
                <span className={`text-[11px] ${isLight ? "text-neutral-600" : "text-white/70"}`}>
                  Explore CAD tech packs &amp; trim placements
                </span>
              </div>
              <a
                href="#tech-packs"
                className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold font-mono tracking-tight transition-all shadow-md"
              >
                View CAD
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};