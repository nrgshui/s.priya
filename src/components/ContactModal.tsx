import React, { useState } from "react";
import { X, Mail, Phone, MapPin, Globe, Copy, Check, Send, Sparkles } from "lucide-react";
import { DESIGNER_INFO } from "../data/portfolioData";
import confetti from "canvas-confetti";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({ name: "", email: "", note: "" });

  if (!isOpen) return null;

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
    setSubmitted(true);
    setTimeout(() => {
      window.location.href = `mailto:${DESIGNER_INFO.email}?subject=Project Collaboration Inquiry from ${formData.name}&body=${encodeURIComponent(
        formData.note + "\n\nFrom: " + formData.name + " (" + formData.email + ")"
      )}`;
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#12141a] border border-white/20 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Close Modal"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
          <Sparkles size={14} />
          <span>DIRECT CONTACT &amp; HIRING</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-black font-anton uppercase text-white mb-2">
          Collaborate with Shubhangi
        </h3>
        <p className="text-xs sm:text-sm text-white/70 mb-6">
          Ready for senior knitwear design, menswear creative direction, kidswear assortment planning, and 3D digital apparel consultation.
        </p>

        {/* Quick Contact Chips */}
        <div className="space-y-3 mb-6">
          {/* Email */}
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <Mail size={16} />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-white/40 block">Email Address</span>
                <span className="text-xs sm:text-sm font-semibold text-white">
                  {DESIGNER_INFO.email}
                </span>
              </div>
            </div>
            <button
              onClick={() => handleCopy(DESIGNER_INFO.email, "email")}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all text-xs flex items-center gap-1 font-mono"
            >
              {copiedType === "email" ? (
                <>
                  <Check size={13} className="text-emerald-400" />
                  <span className="text-emerald-400 text-[11px]">Copied</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span className="text-[11px]">Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Phone */}
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                <Phone size={16} />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-white/40 block">Direct Mobile</span>
                <span className="text-xs sm:text-sm font-semibold text-white">
                  {DESIGNER_INFO.phone}
                </span>
              </div>
            </div>
            <button
              onClick={() => handleCopy(DESIGNER_INFO.phone, "phone")}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all text-xs flex items-center gap-1 font-mono"
            >
              {copiedType === "phone" ? (
                <>
                  <Check size={13} className="text-cyan-400" />
                  <span className="text-cyan-400 text-[11px]">Copied</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span className="text-[11px]">Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Location & LinkedIn */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                <MapPin size={16} />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-white/40 block">Location</span>
                <span className="text-xs font-semibold text-white">Mumbai, India</span>
              </div>
            </div>

            <a
              href={DESIGNER_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/30 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                  <Globe size={16} />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-white/40 block">Profile</span>
                  <span className="text-xs font-semibold text-white group-hover:text-blue-400 transition-colors">
                    LinkedIn
                  </span>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Quick Inquiry Form */}
        <form onSubmit={handleSubmit} className="space-y-3 pt-2">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              required
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-xs focus:outline-none focus:border-emerald-400 transition-colors"
            />
            <input
              type="email"
              required
              placeholder="Your Work Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-xs focus:outline-none focus:border-emerald-400 transition-colors"
            />
          </div>
          <textarea
            required
            rows={3}
            placeholder="Tell Shubhangi about your brand, collection requirements, or timeline..."
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-xs focus:outline-none focus:border-emerald-400 transition-colors resize-none"
          />

          <button
            type="submit"
            disabled={submitted}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:opacity-95 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
          >
            {submitted ? (
              <>
                <Check size={15} />
                <span>Redirecting to Email...</span>
              </>
            ) : (
              <>
                <Send size={15} />
                <span>Send Collaboration Inquiry</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};