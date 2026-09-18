import React, { useState } from "react";
import { Palette, Copy, Check } from "lucide-react";

interface ColorPaletteExplorerProps {
  theme?: "dark" | "light";
}

export const ColorPaletteExplorer: React.FC<ColorPaletteExplorerProps> = ({ theme = "dark" }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const isLight = theme === "light";

  const colors = [
    { name: "White", code: "Standard", hex: "#FFFFFF", group: "Base" },
    { name: "Cannoli Cream", code: "11-4302 TPX", hex: "#F4F0E8", group: "Warm" },
    { name: "Ultimate Gray", code: "17-5104 TPX", hex: "#939597", group: "Neutral" },
    { name: "Elemental Blue", code: "18-3922 TPX", hex: "#466995", group: "Cool" },
    { name: "Black", code: "Pitch", hex: "#111111", group: "Base" },
    { name: "Irish Cream", code: "14-1208 TPX", hex: "#D9C9B4", group: "Warm" },
    { name: "Pineapple", code: "12-0736 TPX", hex: "#F3DA70", group: "Warm" },
    { name: "Golden Cob", code: "15-0947 TPX", hex: "#F5A623", group: "Warm" },
    { name: "Grit", code: "17-1036 TPX", hex: "#A68662", group: "Earthy" },
    { name: "Apricot Crush", code: "15-1247 TPX", hex: "#F4845F", group: "Vibrant" },
    { name: "Cork", code: "16-1422 TPX", hex: "#BA8C63", group: "Earthy" },
    { name: "Sweet Mandarin", code: "16-1356 TPX", hex: "#E86F2D", group: "Vibrant" },
    { name: "Nutshell", code: "18-1140 TPX", hex: "#7E5835", group: "Earthy" },
    { name: "Cappuccino", code: "19-1220 TPX", hex: "#634735", group: "Earthy" },
    { name: "Ground Coffee", code: "19-1109 TPX", hex: "#4B372B", group: "Earthy" },
    { name: "Astro Dust", code: "17-1537 TPX", hex: "#9E4748", group: "Warm" },
    { name: "Crimson", code: "18-1657 TPX", hex: "#8A2328", group: "Vibrant" },
    { name: "Adriatic Sea", code: "17-4440 TCX", hex: "#3A99D8", group: "Cool" },
    { name: "Surf The Web", code: "19-3952 TPX", hex: "#233973", group: "Cool" },
    { name: "Tidal Teal", code: "19-4324 TPX", hex: "#165868", group: "Cool" },
    { name: "Dress Blues", code: "17-4024 TPX", hex: "#1F2C46", group: "Cool" },
    { name: "Cornflower", code: "16-4030 TPX", hex: "#7DA7D9", group: "Cool" },
    { name: "Orchid Petal", code: "14-3710 TPX", hex: "#D8BFD8", group: "Warm" },
    { name: "Purple Swirl", code: "18-3533 TPX", hex: "#7E3F98", group: "Vibrant" },
    { name: "Dusted Grape", code: "19-3424 TPX", hex: "#5C3E57", group: "Vibrant" },
    { name: "Green Fig", code: "15-6317 TPX", hex: "#98B585", group: "Earthy" },
    { name: "Cyber Lime", code: "13-0651 TPX", hex: "#D4FF00", group: "Vibrant" },
    { name: "Green Flare", code: "16-6340 TCX", hex: "#2E8B57", group: "Vibrant" },
    { name: "Malachite", code: "19-5421 TPX", hex: "#1B5E4A", group: "Earthy" },
    { name: "Olive Branch", code: "18-0527 TPX", hex: "#5E5F40", group: "Earthy" },
  ];

  const [activeGroup, setActiveGroup] = useState<string>("All");

  const filtered = colors.filter((c) => activeGroup === "All" || c.group === activeGroup);

  const copy = (val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedCode(val);
    setTimeout(() => setCopiedCode(null), 1800);
  };

  return (
    <section
      id="colors"
      className={`relative w-full py-28 px-4 sm:px-8 border-t transition-colors duration-500 ${
        isLight
          ? "bg-[#f8f9fa] border-black/10 text-neutral-900"
          : "bg-[#0b0d10] border-white/10 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-pink-500 font-mono mb-2">
              <Palette size={14} />
              <span>Standardized Color Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-anton uppercase tracking-tight">
              Style Union Pantone Master Library
            </h2>
            <p className={`max-w-xl text-sm sm:text-base mt-2 ${isLight ? "text-neutral-600" : "text-white/70"}`}>
              Directly extracted from Shubhangi&apos;s master menswear palette (Page 5). Each swatch presented on glassmorphic fabric chips for production dye lab dips.
            </p>
          </div>

          <div
            className={`flex flex-wrap gap-2 p-1.5 rounded-2xl border backdrop-blur-xl ${
              isLight
                ? "bg-white/80 border-black/10 shadow-sm"
                : "bg-white/[0.04] border-white/10"
            }`}
          >
            {["All", "Warm", "Cool", "Earthy", "Vibrant", "Neutral"].map((grp) => (
              <button
                key={grp}
                onClick={() => setActiveGroup(grp)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeGroup === grp
                    ? "bg-pink-500 text-white font-bold shadow-lg shadow-pink-500/25"
                    : isLight
                    ? "text-neutral-600 hover:text-black"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {grp}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filtered.map((color) => {
            const isCopied = copiedCode === color.code;
            return (
              <button
                key={color.name}
                onClick={() => copy(color.code)}
                className={`group relative rounded-2xl p-3 text-left transition-all hover:-translate-y-1 shadow-lg border backdrop-blur-xl overflow-hidden fabric-mesh ${
                  isLight
                    ? "bg-white/85 border-black/10 hover:border-black/25 shadow-black/5"
                    : "bg-[#14161f]/75 border-white/15 hover:border-white/30 shadow-black/40"
                }`}
              >
                {/* Internal fabric tint overlay */}
                <div
                  className="w-full h-16 rounded-xl mb-3 shadow-inner border border-black/20 flex items-center justify-center relative transition-transform group-hover:scale-[1.02]"
                  style={{ backgroundColor: color.hex }}
                >
                  {isCopied && (
                    <div className="px-2 py-1 rounded-lg bg-black/85 backdrop-blur-sm text-white text-[10px] font-mono flex items-center gap-1 shadow-lg">
                      <Check size={11} className="text-emerald-400" />
                      <span>COPIED</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs font-bold truncate block"
                    style={{ color: isLight ? "#111827" : "#ffffff" }}
                  >
                    {color.name}
                  </span>
                  <Copy size={11} className={`${isLight ? "text-neutral-400" : "text-white/40"} group-hover:text-pink-500 transition-colors`} />
                </div>
                <span className={`text-[10px] font-mono block mt-0.5 ${isLight ? "text-neutral-500" : "text-white/50"}`}>
                  {color.code}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};