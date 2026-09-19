import React, { useState, useEffect } from "react";
import { Mail, Menu, X, Sun, Moon } from "lucide-react";

interface NavbarProps {
  onContactClick: () => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onContactClick, theme, onToggleTheme }) => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const isLight = theme === "light";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "TOONHUB", href: "#hero" },
    { label: "Trend Forecasts", href: "#trends" },
    { label: "Color System", href: "#colors" },
    { label: "Experience & Skills", href: "#experience" },
  ];

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 transform ${
        scrolled
          ? `translate-y-0 opacity-100 backdrop-blur-xl border-b py-3 shadow-2xl pointer-events-auto ${
              isLight
                ? "bg-white/90 border-black/10 text-neutral-900"
                : "bg-[#0c0d0e]/90 border-white/10 text-white"
            }`
          : "-translate-y-full opacity-0 pointer-events-none py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
        {/* Brand */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div
            className={`w-8 h-8 rounded-xl font-anton flex items-center justify-center font-bold text-base tracking-tighter group-hover:rotate-6 transition-transform shadow-lg ${
              isLight ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            SP
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider block">
              SHUBHANGI PRIYA
            </span>
            <span className={`text-[9px] uppercase font-mono tracking-widest block ${isLight ? "text-neutral-500" : "text-white/60"}`}>
              KNITWEAR &amp; MENSWEAR DESIGN
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div
          className={`hidden lg:flex items-center gap-6 border px-5 py-1.5 rounded-full backdrop-blur-md ${
            isLight
              ? "bg-black/[0.04] border-black/10"
              : "bg-white/[0.04] border-white/10"
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-xs font-medium transition-colors tracking-wide ${
                isLight
                  ? "text-neutral-600 hover:text-black"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Action Buttons: Theme Toggle + Contact */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            className={`p-2 rounded-full border transition-all ${
              isLight
                ? "bg-black/5 hover:bg-black/10 border-black/10 text-neutral-800"
                : "bg-white/10 hover:bg-white/20 border-white/15 text-white"
            }`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {isLight ? <Moon size={14} className="text-sky-600" /> : <Sun size={14} className="text-amber-300" />}
          </button>

          <button
            onClick={onContactClick}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 ${
              isLight
                ? "bg-black text-white hover:bg-neutral-800"
                : "bg-white text-black hover:bg-neutral-200"
            }`}
          >
            <Mail size={12} />
            <span>Get in Touch</span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onToggleTheme}
            className={`p-1.5 rounded-xl border ${
              isLight ? "bg-black/5 border-black/10 text-black" : "bg-white/10 border-white/15 text-white"
            }`}
          >
            {isLight ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen((o) => !o)}
            className={`p-1.5 rounded-xl border ${
              isLight ? "bg-black/5 border-black/10 text-black" : "bg-white/10 border-white/15 text-white"
            }`}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden backdrop-blur-2xl border-b px-6 py-6 space-y-4 ${
            isLight
              ? "bg-white/95 border-black/10 text-neutral-900"
              : "bg-[#0c0d0e]/95 border-white/10 text-white"
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-semibold py-1"
            >
              {link.label}
            </a>
          ))}
          <div className={`pt-4 border-t ${isLight ? "border-black/10" : "border-white/10"}`}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onContactClick();
              }}
              className={`w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 ${
                isLight ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              <Mail size={16} />
              <span>Contact Shubhangi</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};