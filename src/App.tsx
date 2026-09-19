import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { TrendShowcase } from "./components/TrendShowcase";
import { ColorPaletteExplorer } from "./components/ColorPaletteExplorer";
import { ExperienceSkills } from "./components/ExperienceSkills";
import { ContactModal } from "./components/ContactModal";
import { Footer } from "./components/Footer";
import { Sparkles, ArrowRight } from "lucide-react";

export function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);

  // Sync theme with HTML class for tailwind
  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleDiscoverClick = () => {
    document.getElementById("trends")?.scrollIntoView({ behavior: "smooth" });
  };

  const isLight = theme === "light";

  return (
    <div
      className={`min-h-screen transition-colors duration-500 selection:bg-black selection:text-white ${
        isLight
          ? "bg-[#f8f9fa] text-neutral-900"
          : "bg-[#0c0d0e] text-white selection:bg-white selection:text-black"
      }`}
    >
      {/* Navigation */}
      <Navbar
        onContactClick={() => setIsContactOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Hero Section: TOONHUB Carousel with Indian Origin 3D Figurines, 2-line SHUBHANGI PRIYA ghost text, and Theme Toggle */}
      <HeroSection
        onDiscoverClick={handleDiscoverClick}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Designer Manifesto / Style Union Philosophy Banner (Glassmorphic + Fabric Background) */}
      <section
        className={`relative w-full py-20 px-4 sm:px-8 border-y transition-colors duration-500 overflow-hidden ${
          isLight
            ? "bg-white border-black/10 text-neutral-900"
            : "bg-black border-white/10 text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest mb-3">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className={isLight ? "text-neutral-500" : "text-white/50"}>
                Style Union Philosophy • Menswear &amp; Kidswear
              </span>
            </div>
            <h3 className="text-3xl sm:text-5xl font-black font-anton uppercase tracking-tight mb-4">
              NEVER BLEND IN.
            </h3>
            <p className={`text-sm sm:text-base leading-relaxed ${isLight ? "text-neutral-600" : "text-white/75"}`}>
              Style Union epitomizes a harmonious blend of contemporary allure and youthful exuberance, steadfastly attuned to the pulse of current trends. With an unwavering commitment to affordability, curating seasonal collections that make bold sartorial statements for men and children alike.
            </p>
          </div>

          <div
            className={`grid grid-cols-2 sm:grid-cols-3 gap-4 border-t lg:border-t-0 lg:border-l pt-6 lg:pt-0 lg:pl-10 ${
              isLight ? "border-black/10" : "border-white/10"
            }`}
          >
            <div>
              <span className="text-3xl sm:text-4xl font-black font-anton block">2+</span>
              <span className={`text-xs font-mono uppercase ${isLight ? "text-neutral-500" : "text-white/50"}`}>
                Years Industry Exp.
              </span>
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-black font-anton text-emerald-500 block">40+</span>
              <span className={`text-xs font-mono uppercase ${isLight ? "text-neutral-500" : "text-white/50"}`}>
                CAD Tech Packs
              </span>
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-black font-anton text-cyan-500 block">NIFT</span>
              <span className={`text-xs font-mono uppercase ${isLight ? "text-neutral-500" : "text-white/50"}`}>
                Knitwear Design
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 9 Trend Forecasts & Moodboards in Glassmorphic Cards with Fabric Textures */}
      <TrendShowcase theme={theme} />

      {/* Style Union Master Pantone Library with Fabric Swatch Chips */}
      <ColorPaletteExplorer theme={theme} />

      {/* Career Timeline & Technical Skills in Tailored Wool Weaves */}
      <ExperienceSkills theme={theme} />

      {/* Collaboration CTA Banner */}
      <section
        className={`relative w-full py-24 px-4 sm:px-8 border-t text-center transition-colors duration-500 ${
          isLight
            ? "bg-gradient-to-b from-[#f1f3f6] to-[#e8ecf2] border-black/10 text-neutral-900"
            : "bg-gradient-to-b from-[#0c0d0e] to-[#12141c] border-white/10 text-white"
        }`}
      >
        <div className="max-w-3xl mx-auto space-y-6">
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-mono ${
              isLight
                ? "bg-white border-black/10 text-emerald-600 shadow-sm"
                : "bg-white/5 border-white/15 text-emerald-400"
            }`}
          >
            <Sparkles size={14} />
            <span>Ready for Next Collection Season</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black font-anton uppercase tracking-tight">
            Let&apos;s Build The Next Best-Selling Range
          </h2>

          <p className={`text-sm sm:text-base max-w-xl mx-auto ${isLight ? "text-neutral-600" : "text-white/70"}`}>
            Whether you are planning a high-volume kidswear assortment or trendsetting menswear knits, Shubhangi brings end-to-end design rigor from forecasting to factory floor.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setIsContactOpen(true)}
              className={`px-8 py-4 rounded-full font-bold uppercase text-xs sm:text-sm tracking-wider transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2 ${
                isLight
                  ? "bg-black hover:bg-neutral-800 text-white shadow-black/20"
                  : "bg-white hover:bg-neutral-200 text-black shadow-white/10"
              }`}
            >
              <span>Initiate Collaboration</span>
              <ArrowRight size={16} />
            </button>
            <a
              href="mailto:shubhangi.priya@outlook.com"
              className={`px-8 py-4 rounded-full border font-bold uppercase text-xs sm:text-sm tracking-wider transition-all ${
                isLight
                  ? "bg-white border-black/15 text-neutral-800 hover:bg-neutral-50 shadow-sm"
                  : "bg-white/10 hover:bg-white/15 border-white/20 text-white"
              }`}
            >
              shubhangi.priya@outlook.com
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Contact Drawer Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}