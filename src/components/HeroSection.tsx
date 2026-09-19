import React, { useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight, Sparkles, UserCheck, Baby, Sun, Moon } from "lucide-react";
import { INDIAN_TOON_CHARACTERS, ORIGINAL_FIGMA_IMAGES } from "../data/portfolioData";

interface HeroSectionProps {
  onDiscoverClick?: () => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onDiscoverClick,
  theme,
  onToggleTheme,
}) => {
  // Mode: "indian" (default with 7 Indian characters: 3 Men + 4 Children) or "original" (4 Figma characters)
  const [collectionMode, setCollectionMode] = useState<"indian" | "original">("indian");
  const [categoryFilter, setCategoryFilter] = useState<"all" | "men" | "children">("all");

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth < 640 : false
  );

  // Derive current items
  const activeItems = React.useMemo(() => {
    if (collectionMode === "original") {
      return ORIGINAL_FIGMA_IMAGES.map((item, idx) => ({
        id: `original-${idx}`,
        name: `FIGURINE 0${idx + 1}`,
        category: "Collector" as const,
        role: "Original 3D Model",
        src: item.src,
        bg: item.bg,
        panel: item.panel,
        badge: "TOONHUB CLASSIC",
        story: "The original vinyl art collectable figurine with hyper-stylized proportions.",
        garmentSpec: "Original Figma 3D Shape Edition",
      }));
    }

    if (categoryFilter === "men") {
      return INDIAN_TOON_CHARACTERS.filter((c) => c.category === "Men");
    }
    if (categoryFilter === "children") {
      return INDIAN_TOON_CHARACTERS.filter((c) => c.category === "Children");
    }
    return INDIAN_TOON_CHARACTERS;
  }, [collectionMode, categoryFilter]);

  // Reset activeIndex when items change if out of bounds
  useEffect(() => {
    setActiveIndex(0);
  }, [collectionMode, categoryFilter]);

  // Window resize listener
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Preload images on mount
  useEffect(() => {
    INDIAN_TOON_CHARACTERS.forEach((item) => {
      const img = new Image();
      img.src = item.src;
    });
    ORIGINAL_FIGMA_IMAGES.forEach((item) => {
      const img = new Image();
      img.src = item.src;
    });
  }, []);

  const total = activeItems.length;

  // Navigation logic
  const navigate = useCallback(
    (dir: "next" | "prev") => {
      if (isAnimating || total <= 1) return;
      setIsAnimating(true);
      if (dir === "next") {
        setActiveIndex((prev) => (prev + 1) % total);
      } else {
        setActiveIndex((prev) => (prev - 1 + total) % total);
      }
      setTimeout(() => {
        setIsAnimating(false);
      }, 650);
    },
    [isAnimating, total]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") navigate("prev");
      if (e.key === "ArrowRight") navigate("next");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  const currentItem = activeItems[activeIndex] || activeItems[0];

  return (
    <div
      id="hero"
      className="relative w-full overflow-hidden select-none"
      style={{
        backgroundColor: currentItem?.bg || "#F4845F",
        transition: "background-color 650ms cubic-bezier(0.4, 0, 0.2, 1)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="relative w-full overflow-hidden" style={{ height: "100vh" }}>
        {/* 1. Grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 50,
            opacity: 0.35,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
            backgroundRepeat: "repeat",
          }}
        />

        {/* 2. Giant ghost text "SHUBHANGI PRIYA" in two lines */}
        <div
          className="absolute inset-x-0 flex flex-col items-center justify-center pointer-events-none select-none text-center"
          style={{
            zIndex: 2,
            top: isMobile ? "12%" : "8%",
            fontFamily: "'Anton', sans-serif",
            fontSize: "clamp(60px, 19vw, 240px)",
            fontWeight: 900,
            color: "white",
            opacity: 0.92,
            lineHeight: 0.86,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            whiteSpace: "nowrap",
          }}
        >
          <span className="block drop-shadow-sm">SHUBHANGI</span>
          <span className="block drop-shadow-sm">PRIYA</span>
        </div>

        {/* 3. Top-left brand label "TOONHUB" */}
        <div
          className="absolute top-6 left-4 sm:left-8 flex flex-col gap-1.5"
          style={{ zIndex: 60 }}
        >
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-semibold uppercase text-white tracking-[0.18em]"
              style={{ opacity: 0.95 }}
            >
              TOONHUB
            </span>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-black/40 text-white border border-white/20 backdrop-blur-md">
              {collectionMode === "indian" ? "Indian Origin (7)" : "Figma Classic (4)"}
            </span>
          </div>
          <span className="text-[11px] font-medium text-white/80 tracking-wider">
            KNITWEAR &amp; MENSWEAR DESIGNER PORTFOLIO
          </span>
        </div>

        {/* Top-Right Character Selector & Switchers (Theme + Edition) */}
        <div
          className="absolute top-6 right-4 sm:right-8 flex items-center gap-2"
          style={{ zIndex: 60 }}
        >
          {collectionMode === "indian" && (
            <div className="hidden sm:flex items-center bg-black/35 border border-white/20 rounded-full p-1 backdrop-blur-md">
              <button
                onClick={() => setCategoryFilter("all")}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                  categoryFilter === "all"
                    ? "bg-white text-black shadow-lg"
                    : "text-white/80 hover:text-white"
                }`}
              >
                All (7)
              </button>
              <button
                onClick={() => setCategoryFilter("men")}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all flex items-center gap-1 ${
                  categoryFilter === "men"
                    ? "bg-white text-black shadow-lg"
                    : "text-white/80 hover:text-white"
                }`}
              >
                <UserCheck size={13} />
                Men (3)
              </button>
              <button
                onClick={() => setCategoryFilter("children")}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all flex items-center gap-1 ${
                  categoryFilter === "children"
                    ? "bg-white text-black shadow-lg"
                    : "text-white/80 hover:text-white"
                }`}
              >
                <Baby size={13} />
                Kids (4)
              </button>
            </div>
          )}

          {/* Switch to Figma / Indian 7 Button */}
          <button
            onClick={() => {
              setCollectionMode((m) => (m === "indian" ? "original" : "indian"));
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/30 hover:bg-black/50 border border-white/30 text-white text-xs font-medium tracking-wide transition-all backdrop-blur-md"
            title="Toggle between Indian Origin Toons and Original Figma Toons"
          >
            <Sparkles size={13} className="text-yellow-300" />
            <span className="hidden md:inline">
              {collectionMode === "indian" ? "Switch to Figma 4" : "Switch to Indian 7"}
            </span>
            <span className="md:hidden">
              {collectionMode === "indian" ? "Figma" : "Indian"}
            </span>
          </button>

          {/* Light / Dark Theme Switch Button (Beside Switch to Indian 7) */}
          <button
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/30 hover:bg-black/50 border border-white/30 text-white text-xs font-medium tracking-wide transition-all backdrop-blur-md cursor-pointer"
            title={`Current: ${theme} theme. Click to switch.`}
          >
            {theme === "dark" ? (
              <>
                <Sun size={14} className="text-amber-300 animate-spin-slow" />
                <span className="hidden sm:inline">Light</span>
              </>
            ) : (
              <>
                <Moon size={14} className="text-sky-300" />
                <span className="hidden sm:inline">Dark</span>
              </>
            )}
          </button>
        </div>

        {/* Active Character Quick Info Pill (Center-Top) */}
        <div
          className="absolute top-16 sm:top-20 inset-x-0 flex justify-center pointer-events-none"
          style={{ zIndex: 40 }}
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 py-1.5 rounded-full bg-black/45 border border-white/20 backdrop-blur-xl text-white shadow-2xl animate-fade-in">
            <span className="text-xs font-bold uppercase tracking-wider text-white">
              {currentItem.name}
            </span>
            <span className="text-white/40">•</span>
            <span className="text-[11px] font-medium text-white/90">
              {currentItem.role}
            </span>
            <span className="text-white/40">•</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/20 text-white">
              0{activeIndex + 1} / 0{total}
            </span>
          </div>
        </div>

        {/* 4. Carousel */}
        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          {activeItems.map((item, index) => {
            let role: "center" | "left" | "right" | "back" = "back";
            const diff = (index - activeIndex + total) % total;

            if (diff === 0) {
              role = "center";
            } else if (diff === total - 1) {
              role = "left";
            } else if (diff === 1) {
              role = "right";
            } else {
              role = "back";
            }

            let style: React.CSSProperties = {
              position: "absolute",
              aspectRatio: "0.6 / 1",
              transition:
                "transform 650ms cubic-bezier(0.4, 0, 0.2, 1), filter 650ms cubic-bezier(0.4, 0, 0.2, 1), opacity 650ms cubic-bezier(0.4, 0, 0.2, 1), left 650ms cubic-bezier(0.4, 0, 0.2, 1)",
              willChange: "transform, filter, opacity",
            };

            if (role === "center") {
              style = {
                ...style,
                transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`,
                filter: "none",
                opacity: 1,
                zIndex: 20,
                left: "50%",
                height: isMobile ? "60%" : "92%",
                bottom: isMobile ? "22%" : 0,
              };
            } else if (role === "left") {
              style = {
                ...style,
                transform: "translateX(-50%) scale(1)",
                filter: "blur(2px)",
                opacity: 0.85,
                zIndex: 10,
                left: isMobile ? "20%" : "30%",
                height: isMobile ? "16%" : "28%",
                bottom: isMobile ? "32%" : "12%",
              };
            } else if (role === "right") {
              style = {
                ...style,
                transform: "translateX(-50%) scale(1)",
                filter: "blur(2px)",
                opacity: 0.85,
                zIndex: 10,
                left: isMobile ? "80%" : "70%",
                height: isMobile ? "16%" : "28%",
                bottom: isMobile ? "32%" : "12%",
              };
            } else {
              const isExtraBack = total > 4 && diff !== 2 && diff !== total - 2;
              style = {
                ...style,
                transform: "translateX(-50%) scale(1)",
                filter: "blur(4px)",
                opacity: isExtraBack ? 0 : 0.75,
                zIndex: 5,
                left: "50%",
                height: isMobile ? "13%" : "22%",
                bottom: isMobile ? "32%" : "12%",
                pointerEvents: "none",
              };
            }

            return (
              <div key={item.id} style={style}>
                <img
                  src={item.src}
                  alt={item.name}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if ((item as any).fallbackSrc && target.src !== (item as any).fallbackSrc) {
                      target.src = (item as any).fallbackSrc;
                    }
                  }}
                  draggable={false}
                  className="w-full h-full object-contain object-bottom select-none drop-shadow-2xl"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    objectPosition: "bottom center",
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* 5. Bottom-left text + nav buttons: GLASSMORPHIC CONTAINER FOR MAXIMUM CLARITY */}
        <div
          className="absolute bottom-6 left-4 sm:bottom-16 sm:left-16 flex flex-col justify-end"
          style={{
            zIndex: 60,
            maxWidth: "380px",
          }}
        >
          <div className="bg-black/55 backdrop-blur-2xl border border-white/20 p-5 sm:p-6 rounded-3xl shadow-2xl relative overflow-hidden">
            {/* Subtle internal fabric twill weave */}
            <div className="absolute inset-0 pointer-events-none opacity-10 fabric-twill" />

            <p
              className="text-white font-bold uppercase mb-2 text-base sm:text-[22px] tracking-widest relative z-10"
              style={{
                opacity: 0.98,
                letterSpacing: "0.02em",
                textShadow: "0 2px 10px rgba(0,0,0,0.5)",
              }}
            >
              TOONHUB FIGURINES
            </p>
            <p
              className="hidden sm:block text-white text-xs sm:text-sm mb-4 relative z-10 font-normal"
              style={{
                opacity: 0.92,
                lineHeight: 1.6,
                textShadow: "0 1px 4px rgba(0,0,0,0.6)",
              }}
            >
              The artwork is stunning, shipped fully prepared. The finish is a vision, the 3D craft is flawless. Many thanks! Wishing you the win. Order now.
            </p>

            {/* Active Garment Micro Note */}
            <div className="mb-4 flex items-center gap-2 relative z-10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <p className="text-[11px] text-white/90 font-mono tracking-tight line-clamp-1">
                {currentItem.garmentSpec}
              </p>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 relative z-10">
              <button
                onClick={() => navigate("prev")}
                disabled={isAnimating}
                aria-label="Previous Figurine"
                className="w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center cursor-pointer transition-all duration-150 disabled:opacity-50"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  border: "2px solid white",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.08)";
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
                }}
              >
                <ArrowLeft size={22} strokeWidth={2.25} color="white" />
              </button>

              <button
                onClick={() => navigate("next")}
                disabled={isAnimating}
                aria-label="Next Figurine"
                className="w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center cursor-pointer transition-all duration-150 disabled:opacity-50"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  border: "2px solid white",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.08)";
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
                }}
              >
                <ArrowRight size={22} strokeWidth={2.25} color="white" />
              </button>

              {/* Pagination dots */}
              <div className="flex items-center gap-1.5 ml-2">
                {activeItems.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (!isAnimating) {
                        setIsAnimating(true);
                        setActiveIndex(i);
                        setTimeout(() => setIsAnimating(false), 650);
                      }
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeIndex ? "w-6 bg-white shadow-md" : "w-1.5 bg-white/40 hover:bg-white/80"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 6. Bottom-right link "DISCOVER IT" */}
        <div
          className="absolute bottom-6 right-4 sm:bottom-16 sm:right-12 flex items-center cursor-pointer group"
          style={{ zIndex: 60 }}
          onClick={onDiscoverClick}
        >
          <a
            href="#atelier"
            onClick={(e) => {
              e.preventDefault();
              if (onDiscoverClick) {
                onDiscoverClick();
              } else {
                document.getElementById("atelier")?.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="flex items-center transition-opacity duration-200 uppercase no-underline text-white drop-shadow-lg"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: "clamp(24px, 4.5vw, 60px)",
              fontWeight: 400,
              opacity: 0.95,
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "0.95";
            }}
          >
            DISCOVER IT
            <ArrowRight
              className="ml-2 sm:ml-4 w-6 h-6 sm:w-9 sm:h-9 transition-transform duration-200 group-hover:translate-x-2"
              strokeWidth={2.25}
              color="white"
            />
          </a>
        </div>
      </div>
    </div>
  );
};