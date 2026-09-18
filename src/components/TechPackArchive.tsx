import React, { useState } from "react";
import { TECH_PACKS } from "../data/portfolioData";
import { FileText, ExternalLink, X, Tag, Scissors, Sparkles, CheckCircle2 } from "lucide-react";

interface TechPackArchiveProps {
  theme?: "dark" | "light";
}

export const TechPackArchive: React.FC<TechPackArchiveProps> = ({ theme = "dark" }) => {
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [activeModalPack, setActiveModalPack] = useState<typeof TECH_PACKS[0] | null>(null);

  const isLight = theme === "light";
  const tags = ["All", "Core Uniset", "Flat Knits", "Cuban Mood", "Graphic Sweats"];

  const filteredPacks = TECH_PACKS.filter((pack) => {
    if (selectedTag === "All") return true;
    return pack.tag === selectedTag;
  });

  // Purpose-specific card styling with fabric backgrounds
  const getTechPackDesign = (tag: string) => {
    switch (tag) {
      case "Core Uniset":
        return {
          fabric: "fabric-twill",
          accentColor: "#00E5FF",
          badgeClass: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
          glow: "from-cyan-500/15 via-blue-500/5 to-transparent",
        };
      case "Flat Knits":
        return {
          fabric: "fabric-ribbed",
          accentColor: "#10B981",
          badgeClass: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
          glow: "from-emerald-500/15 via-teal-500/5 to-transparent",
        };
      case "Cuban Mood":
        return {
          fabric: "fabric-linen",
          accentColor: "#F59E0B",
          badgeClass: "bg-amber-500/15 text-amber-400 border-amber-500/30",
          glow: "from-amber-500/15 via-rose-500/5 to-transparent",
        };
      case "Graphic Sweats":
        return {
          fabric: "fabric-mesh",
          accentColor: "#A855F7",
          badgeClass: "bg-purple-500/15 text-purple-400 border-purple-500/30",
          glow: "from-purple-500/15 via-pink-500/5 to-transparent",
        };
      default:
        return {
          fabric: "fabric-twill",
          accentColor: "#00E5FF",
          badgeClass: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
          glow: "from-cyan-500/10 to-transparent",
        };
    }
  };

  return (
    <section
      id="tech-packs"
      className={`relative w-full py-28 px-4 sm:px-8 border-t transition-colors duration-500 ${
        isLight
          ? "bg-[#f1f3f7] border-black/10 text-neutral-900"
          : "bg-[#0a0c10] border-white/10 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-cyan-500 font-mono mb-2">
              <FileText size={14} />
              <span>Production Blueprints &amp; Tech Packs</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-anton uppercase tracking-tight">
              Garment Engineering Archive
            </h2>
            <p className={`max-w-2xl text-sm sm:text-base mt-2 ${isLight ? "text-neutral-600" : "text-white/70"}`}>
              Real mill-ready CAD specifications, 290 GSM cotton loopers, trim placement matrices, and high-density print techniques authored by Shubhangi for Style Union.
            </p>
          </div>

          {/* Tags */}
          <div
            className={`flex flex-wrap items-center gap-2 p-1.5 rounded-2xl backdrop-blur-xl border ${
              isLight
                ? "bg-white/80 border-black/10 shadow-md"
                : "bg-white/[0.04] border-white/10"
            }`}
          >
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedTag === tag
                    ? "bg-cyan-500 text-black font-bold shadow-lg shadow-cyan-500/25"
                    : isLight
                    ? "text-neutral-600 hover:text-black"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Tech Pack Cards (Glassmorphic + Fabric Weave Backgrounds) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPacks.map((pack) => {
            const design = getTechPackDesign(pack.tag);

            return (
              <div
                key={pack.id}
                onClick={() => setActiveModalPack(pack)}
                className={`group rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1.5 relative overflow-hidden border backdrop-blur-2xl shadow-xl ${
                  isLight
                    ? "bg-white/80 border-black/10 hover:border-cyan-500/60 shadow-black/5"
                    : "bg-[#131620]/75 border-white/15 hover:border-cyan-400/50 shadow-black/40"
                }`}
              >
                {/* 1. Underlying Woven Fabric Texture */}
                <div
                  className={`absolute inset-0 pointer-events-none opacity-25 ${design.fabric}`}
                />

                {/* 2. Glassmorphic Radiant Purpose Glow */}
                <div
                  className={`absolute -top-16 -right-16 w-36 h-36 rounded-full blur-2xl pointer-events-none opacity-40 bg-gradient-to-br ${design.glow}`}
                />

                {/* Card Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between text-[11px] font-mono mb-3">
                    <span className="font-bold" style={{ color: design.accentColor }}>
                      {pack.code}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full border text-[10px] font-semibold ${design.badgeClass}`}>
                      {pack.tag}
                    </span>
                  </div>

                  <h3
                    className="text-lg font-bold mb-2 line-clamp-2 transition-colors group-hover:text-cyan-400"
                    style={{ color: isLight ? "#111827" : "#ffffff" }}
                  >
                    {pack.name}
                  </h3>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-start gap-2 text-xs">
                      <Scissors size={13} className="shrink-0 mt-0.5 text-cyan-400" />
                      <span className={`font-mono text-[11px] ${isLight ? "text-neutral-700" : "text-white/70"}`}>
                        {pack.fabric}
                      </span>
                    </div>
                    <div className="flex items-start gap-2 text-xs">
                      <Tag size={13} className="shrink-0 mt-0.5 text-cyan-400" />
                      <span className={`text-[11px] ${isLight ? "text-neutral-600" : "text-white/70"}`}>
                        {pack.fit}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`p-3 rounded-2xl border mb-4 backdrop-blur-md ${
                      isLight
                        ? "bg-white/90 border-black/5"
                        : "bg-black/35 border-white/5"
                    }`}
                  >
                    <span className={`text-[10px] uppercase font-mono block mb-1 ${isLight ? "text-neutral-500" : "text-white/40"}`}>
                      Key Artwork / Spec
                    </span>
                    <p className={`text-xs font-medium line-clamp-2 ${isLight ? "text-neutral-800" : "text-white/90"}`}>
                      {pack.prints[0]}
                    </p>
                  </div>
                </div>

                <div
                  className={`relative z-10 pt-4 border-t flex items-center justify-between text-xs font-mono transition-colors group-hover:text-cyan-400 ${
                    isLight ? "border-black/10 text-neutral-500" : "border-white/10 text-white/60"
                  }`}
                >
                  <span>Inspect Spec Sheet</span>
                  <ExternalLink size={14} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Inspector */}
        {activeModalPack && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
            <div
              className={`border rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto backdrop-blur-2xl fabric-twill ${
                isLight
                  ? "bg-white border-black/15 text-neutral-900"
                  : "bg-[#141722] border-white/20 text-white"
              }`}
            >
              <button
                onClick={() => setActiveModalPack(null)}
                className={`absolute top-6 right-6 p-2 rounded-full transition-colors ${
                  isLight
                    ? "bg-black/10 hover:bg-black/20 text-black"
                    : "bg-white/10 hover:bg-white/20 text-white"
                }`}
                aria-label="Close Modal"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
                <span className="font-bold">{activeModalPack.code}</span>
                <span>•</span>
                <span className={isLight ? "text-neutral-500" : "text-white/60"}>
                  {activeModalPack.division}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black font-anton uppercase mb-4">
                {activeModalPack.name}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className={`p-4 rounded-2xl border ${isLight ? "bg-black/5 border-black/10" : "bg-white/[0.03] border-white/10"}`}>
                  <span className={`text-[10px] uppercase font-mono block mb-1 ${isLight ? "text-neutral-500" : "text-white/40"}`}>
                    Fabric Construction
                  </span>
                  <span className="text-sm font-semibold">
                    {activeModalPack.fabric}
                  </span>
                </div>
                <div className={`p-4 rounded-2xl border ${isLight ? "bg-black/5 border-black/10" : "bg-white/[0.03] border-white/10"}`}>
                  <span className={`text-[10px] uppercase font-mono block mb-1 ${isLight ? "text-neutral-500" : "text-white/40"}`}>
                    Silhouette &amp; Fit
                  </span>
                  <span className="text-sm font-semibold">
                    {activeModalPack.fit}
                  </span>
                </div>
              </div>

              {/* Prints & Trims Specifications */}
              <div className="mb-6">
                <h4 className={`text-xs uppercase tracking-wider font-mono mb-3 flex items-center gap-2 ${isLight ? "text-neutral-600" : "text-white/60"}`}>
                  <Sparkles size={14} className="text-cyan-400" />
                  <span>Artworks, Embellishments &amp; Trims</span>
                </h4>
                <div className="space-y-2">
                  {activeModalPack.prints.map((print, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-xl border flex items-start gap-3 ${
                        isLight
                          ? "bg-neutral-100 border-neutral-200 text-neutral-800"
                          : "bg-black/45 border-white/10 text-white/90"
                      }`}
                    >
                      <CheckCircle2 size={15} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-xs leading-relaxed font-mono">
                        {print}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Garment Details & Production Comments */}
              <div className={`p-4 rounded-2xl border mb-6 ${isLight ? "bg-cyan-50 border-cyan-200" : "bg-cyan-950/20 border-cyan-500/25"}`}>
                <span className="text-[10px] uppercase font-mono text-cyan-500 font-bold block mb-1">
                  Design Notes &amp; Construction Comments
                </span>
                <p className={`text-xs leading-relaxed ${isLight ? "text-neutral-700" : "text-white/80"}`}>
                  {activeModalPack.details}
                </p>
              </div>

              {/* Colorways */}
              <div>
                <span className={`text-[10px] uppercase font-mono block mb-2 ${isLight ? "text-neutral-500" : "text-white/40"}`}>
                  Approved Seasonal Colorways
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeModalPack.colors.map((col) => (
                    <span
                      key={col}
                      className={`text-xs font-mono px-3 py-1.5 rounded-xl border ${
                        isLight
                          ? "bg-black/5 border-black/10 text-neutral-800"
                          : "bg-white/10 border-white/15 text-white"
                      }`}
                    >
                      {col}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};