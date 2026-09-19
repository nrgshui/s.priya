import React from "react";
import { DESIGNER_INFO } from "../data/portfolioData";
import { ArrowUp, Mail, Phone, MapPin, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-[#08090b] text-white py-16 px-4 sm:px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/10">
          {/* Brand Col (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white text-black font-anton flex items-center justify-center font-bold text-xl tracking-tighter">
                SP
              </div>
              <div>
                <h3 className="text-base font-bold uppercase tracking-wider text-white">
                  SHUBHANGI PRIYA
                </h3>
                <p className="text-xs font-mono text-emerald-400">
                  ASSISTANT MANAGER • KNITWEAR &amp; APPAREL
                </p>
              </div>
            </div>

            <p className="text-xs text-white/60 leading-relaxed max-w-sm">
              Alumna of National Institute of Fashion Technology (NIFT) Mumbai. Driving commercial and creative knitwear innovation across Style Union and DMart.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/80">
                #NEVERBLENDIN
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/80">
                CLO 3D CERTIFIED
              </span>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[11px] uppercase font-mono tracking-wider text-white/40 block">
              Portfolio Index
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero" className="text-white/70 hover:text-white transition-colors">
                  TOONHUB 3D Figurines
                </a>
              </li>
              <li>
                <a href="#trends" className="text-white/70 hover:text-white transition-colors">
                  9 Style Union Trend Stories
                </a>
              </li>
              <li>
                <a href="#colors" className="text-white/70 hover:text-white transition-colors">
                  Pantone Master Library
                </a>
              </li>
              <li>
                <a href="#experience" className="text-white/70 hover:text-white transition-colors">
                  Career Journey &amp; Skills
                </a>
              </li>
            </ul>
          </div>

          {/* Contact (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-[11px] uppercase font-mono tracking-wider text-white/40 block">
              Direct Inquiries
            </span>
            <div className="space-y-2 text-xs">
              <a
                href={`mailto:${DESIGNER_INFO.email}`}
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <Mail size={14} className="text-emerald-400" />
                <span>{DESIGNER_INFO.email}</span>
              </a>
              <a
                href={`tel:${DESIGNER_INFO.phone}`}
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <Phone size={14} className="text-cyan-400" />
                <span>{DESIGNER_INFO.phone}</span>
              </a>
              <div className="flex items-center gap-2 text-white/60">
                <MapPin size={14} className="text-amber-400" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Shubhangi Priya. All rights reserved. Style Union designs &amp; CAD property.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all text-xs font-mono"
          >
            <span>Back to top</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
};
