import React, { useState } from "react";
import { STYLE_UNION_TRENDS } from "../data/portfolioData";
import { Compass, Layers, Check, Copy } from "lucide-react";

interface TrendShowcaseProps {
  theme?: "dark" | "light";
}

export const TrendShowcase: React.FC<TrendShowcaseProps> = ({ theme = "dark" }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const isLight = theme === "light";
  const filters = ["All", "Modern Smart", "Modern Active", "Modern Explorer", "Modern Street"];

  const filteredTrends = STYLE_UNION_TRENDS.filter((trend) => {
    if (selectedFilter === "All") return true;
    return trend.sub.includes(selectedFilter);
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    setTimeout(() => setCopiedCode(null), 1800);
  };

  // Assign distinct purpose-driven fabric weaves and color themes to each trend card
  const getCardDesignProps = (trendId: string) => {
    switch (trendId) {
      case "retro-redo":
        return {
          fabricClass: "fabric-herringbone",
          accentColor: "#F4845F",
          badgeBg: "bg-orange-500/15 text-orange-400 border-orange-500/30",
          glowGradient: "from-orange-500/10 via-emerald-500/5 to-transparent",
        };
      case "nautical-island-boy":
        return {
          fabricClass: "fabric-linen",
          accentColor: "#3A99D8",
          badgeBg: "bg-sky-500/15 text-sky-400 border-sky-500/30",
          glowGradient: "from-sky-500/10 via-amber-500/5 to-transparent",
        };
      case "serene-futurism":
        return {
          fabricClass: "fabric-mesh",
          accentColor: "#D4FF00",
          badgeBg: "bg-lime-500/15 text-lime-400 border-lime-500/30",
          glowGradient: "from-lime-500/10 via-purple-500/10 to-transparent",
        };
      case "engineered-nature":
        return {
          fabricClass: "fabric-twill",
          accentColor: "#165868",
          badgeBg: "bg-teal-500/15 text-teal-400 border-teal-500/30",
          glowGradient: "from-teal-500/10 via-emerald-500/5 to-transparent",
        };
      case "desert-nomad":
        return {
          fabricClass: "fabric-linen",
          accentColor: "#9E4748",
          badgeBg: "bg-rose-500/15 text-rose-400 border-rose-500/30",
          glowGradient: "from-rose-500/10 via-amber-500/5 to-transparent",
        };
      case "preppy-outdoors":
        return {
          fabricClass: "fabric-herringbone",
          accentColor: "#5E5F40",
          badgeBg: "bg-amber-600/15 text-amber-400 border-amber-600/30",
          glowGradient: "from-amber-600/10 via-emerald-600/5 to-transparent",
        };
      case "modern-mystic":
        return {
          fabricClass: "fabric-twill",
          accentColor: "#7DA7D9",
          badgeBg: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
          glowGradient: "from-indigo-500/10 via-cyan-500/5 to-transparent",
        };
      case "tropadelic":
        return {
          fabricClass: "fabric-mesh",
          accentColor: "#7E3F98",
          badgeBg: "bg-fuchsia-500/15 text-fuchsia-400 border-fuchsia-500/30",
          glowGradient: "from-fuchsia-500/10 via-blue-500/10 to-transparent",
        };
      case "bohemian-alchemist":
        return {
          fabricClass: "fabric-linen",
          accentColor: "#BA8C63",
          badgeBg: "bg-amber-500/15 text-amber-300 border-amber-500/30",
          glowGradient: "from-amber-500/10 via-rose-500/5 to-transparent",
        };
      default:
        return {
          fabricClass: "fabric-twill",
          accentColor: "#F4845F",
          badgeBg: "bg-white/10 text-white border-white/20",
          glowGradient: "from-white/5 to-transparent",
        };
    }
  };

  return (
    <section
      id="trends"
      className={`relative w-full py-28 px-4 sm:px-8 border-t transition-colors duration-500 ${
        isLight
          ? "bg-[#fafafa] border-black/10 text-neutral-900"
          : "bg-[#0c0d0e] border-white/10 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-500 font-mono mb-2">
              <Compass size={14} />
              <span>Style Union Seasonal Direction</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-anton uppercase tracking-tight">
              Trend Forecasts &amp; Moodboards
            </h2>
            <p className={`max-w-2xl text-sm sm:text-base mt-2 ${isLight ? "text-neutral-600" : "text-white/70"}`}>
              Nine curated seasonal trend narratives developed by Shubhangi Priya for Style Union Menswear — each presented in glassmorphic cards with custom woven fabric textures and color stories.
            </p>
          </div>

          {/* Filter Pills */}
          <div
            className={`flex flex-wrap items-center gap-2 p-1.5 rounded-2xl backdrop-blur-xl border ${
              isLight
                ? "bg-white/80 border-black/10 shadow-md"
                : "bg-white/[0.04] border-white/10"
            }`}
          >
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedFilter === filter
                    ? isLight
                      ? "bg-black text-white shadow-md"
                      : "bg-white text-black shadow-lg"
                    : isLight
                    ? "text-neutral-600 hover:text-black"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Trends Grid: Glassmorphic Cards with Fabric Texture Backgrounds */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTrends.map((trend, idx) => {
            const design = getCardDesignProps(trend.id);

            return (
              <div
                key={trend.id}
                className={`group rounded-3xl p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 relative overflow-hidden border backdrop-blur-2xl shadow-xl ${
                  isLight
                    ? "bg-white/85 border-black/10 hover:border-black/25 shadow-black/5"
                    : "bg-[#14161f]/75 border-white/15 hover:border-white/30 shadow-black/40"
                }`}
              >
                {/* 1. Underlying Woven Fabric Texture */}
                <div
                  className={`absolute inset-0 pointer-events-none opacity-25 ${design.fabricClass}`}
                />

                {/* 2. Glassmorphic Radiant Purpose Glow */}
                <div
                  className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-40 bg-gradient-to-br ${design.glowGradient}`}
                />

                {/* Card Content (Relative z-10) */}
                <div className="relative z-10">
                  {/* Header Sub & Index */}
                  <div className="flex items-center justify-between text-xs font-mono mb-3">
                    <span className={`uppercase tracking-wider px-2.5 py-0.5 rounded-full border text-[10px] font-semibold ${design.badgeBg}`}>
                      {trend.sub}
                    </span>
                    <span className={`font-bold ${isLight ? "text-neutral-400" : "text-white/40"}`}>
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3
                    className="text-2xl font-black font-anton uppercase tracking-tight mb-2 transition-colors"
                    style={{ color: isLight ? "#111827" : "#ffffff" }}
                  >
                    {trend.title}
                  </h3>
                  <p
                    className="text-xs font-medium mb-3 italic"
                    style={{ color: design.accentColor }}
                  >
                    &ldquo;{trend.tagline}&rdquo;
                  </p>
                  <p className={`text-xs leading-relaxed mb-6 ${isLight ? "text-neutral-600" : "text-white/75"}`}>
                    {trend.description}
                  </p>

                  {/* Fabric Sensibility Tags */}
                  <div className="mb-6">
                    <span className={`text-[10px] uppercase font-mono block mb-2 flex items-center gap-1.5 ${isLight ? "text-neutral-500" : "text-white/40"}`}>
                      <Layers size={11} /> Fabric Sensibility
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {trend.fabrics.map((fabric) => (
                        <span
                          key={fabric}
                          className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border backdrop-blur-md ${
                            isLight
                              ? "bg-white/80 border-black/10 text-neutral-800 shadow-sm"
                              : "bg-white/[0.06] border-white/10 text-white/90"
                          }`}
                        >
                          {fabric}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Color Palette Swatches */}
                <div className={`relative z-10 pt-4 border-t ${isLight ? "border-black/10" : "border-white/10"}`}>
                  <span className={`text-[10px] uppercase font-mono block mb-2 ${isLight ? "text-neutral-500" : "text-white/40"}`}>
                    Pantone Harmonies (Click to copy)
                  </span>
                  <div className="grid grid-cols-5 gap-1.5">
                    {trend.palette.map((color) => {
                      const isCopied = copiedCode === color.code;
                      return (
                        <button
                          key={color.name}
                          onClick={() => copyToClipboard(color.code)}
                          title={`${color.name}: ${color.code} (Click to copy)`}
                          className="group/color relative flex flex-col items-center cursor-pointer"
                        >
                          <div
                            className="w-full h-8 rounded-lg border border-black/20 shadow-inner group-hover/color:scale-110 transition-transform relative flex items-center justify-center"
                            style={{ backgroundColor: color.hex }}
                          >
                            {isCopied && (
                              <Check size={12} className="text-white drop-shadow-md" />
                            )}
                          </div>
                          <span className={`text-[9px] font-mono truncate w-full text-center mt-1 ${isLight ? "text-neutral-500" : "text-white/50"}`}>
                            {color.name.split(" ")[0]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};