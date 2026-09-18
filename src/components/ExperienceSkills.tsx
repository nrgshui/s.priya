import React from "react";
import { DESIGNER_INFO } from "../data/portfolioData";
import { Briefcase, GraduationCap, Award, Wrench, CheckCircle } from "lucide-react";

interface ExperienceSkillsProps {
  theme?: "dark" | "light";
}

export const ExperienceSkills: React.FC<ExperienceSkillsProps> = ({ theme = "dark" }) => {
  const isLight = theme === "light";

  return (
    <section
      id="experience"
      className={`relative w-full py-28 px-4 sm:px-8 border-t transition-colors duration-500 ${
        isLight
          ? "bg-[#f5f6f8] border-black/10 text-neutral-900"
          : "bg-[#0b0d10] border-white/10 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-500 font-mono mb-2">
            <Briefcase size={14} />
            <span>Professional Pedigree</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-anton uppercase tracking-tight">
            Experience &amp; Expertise
          </h2>
          <p className={`max-w-2xl text-sm sm:text-base mt-2 ${isLight ? "text-neutral-600" : "text-white/70"}`}>
            Proven track record spanning fast-fashion kidswear leadership at DMart to cutting-edge youth menswear and knitwear ranges at Style Union and Reliance Retail.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Work Experience Timeline (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <h3 className="text-xl font-bold font-anton uppercase tracking-wide flex items-center gap-2">
              <Briefcase size={18} className="text-emerald-500" />
              <span>Career Journey</span>
            </h3>

            <div className={`relative border-l-2 pl-6 sm:pl-8 ml-3 space-y-10 ${isLight ? "border-neutral-300" : "border-white/10"}`}>
              {DESIGNER_INFO.experience.map((exp, idx) => (
                <div key={idx} className="relative group">
                  {/* Dot */}
                  <div
                    className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-emerald-500 group-hover:scale-125 transition-transform ${
                      isLight ? "bg-white" : "bg-[#0b0d10]"
                    }`}
                  />

                  {/* Career Glassmorphic Card with Ribbed Knit / Tailored Wool Fabric Background */}
                  <div
                    className={`rounded-3xl p-6 transition-all relative overflow-hidden border backdrop-blur-2xl shadow-xl fabric-ribbed ${
                      isLight
                        ? "bg-white/85 border-black/10 hover:border-emerald-500/40 shadow-black/5"
                        : "bg-[#14161f]/75 border-white/15 hover:border-emerald-500/40 shadow-black/40"
                    }`}
                  >
                    {/* Subtle Emerald Purpose Glow */}
                    <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl pointer-events-none opacity-20 bg-emerald-500" />

                    <div className="relative z-10">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 font-semibold">
                          {exp.period}
                        </span>
                        <span className={`text-xs font-mono ${isLight ? "text-neutral-500" : "text-white/50"}`}>
                          {exp.location}
                        </span>
                      </div>

                      <h4 className="text-lg font-bold mb-0.5">{exp.role}</h4>
                      <div className="text-sm font-semibold text-emerald-500 mb-4">{exp.company}</div>

                      <ul className="space-y-2">
                        {exp.achievements.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs leading-relaxed">
                            <CheckCircle size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                            <span className={isLight ? "text-neutral-700" : "text-white/75"}>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Education Block (Glassmorphic + Twill Weave) */}
            <div className="pt-6">
              <h3 className="text-xl font-bold font-anton uppercase tracking-wide flex items-center gap-2 mb-6">
                <GraduationCap size={20} className="text-cyan-500" />
                <span>Education</span>
              </h3>

              <div
                className={`rounded-3xl p-6 shadow-xl relative overflow-hidden border backdrop-blur-2xl fabric-twill ${
                  isLight
                    ? "bg-white/85 border-black/10 shadow-black/5"
                    : "bg-[#14161f]/75 border-white/15 shadow-black/40"
                }`}
              >
                <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-2xl pointer-events-none opacity-25 bg-cyan-500" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between text-xs font-mono text-cyan-500 font-bold mb-2">
                    <span>{DESIGNER_INFO.education.year}</span>
                    <span>B.Des Honors</span>
                  </div>
                  <h4 className="text-lg font-bold mb-1">
                    {DESIGNER_INFO.education.degree}
                  </h4>
                  <div className={`text-sm font-semibold mb-3 ${isLight ? "text-neutral-700" : "text-white/70"}`}>
                    {DESIGNER_INFO.education.institution}
                  </div>
                  <p className={`text-xs leading-relaxed ${isLight ? "text-neutral-600" : "text-white/60"}`}>
                    Specialized in computerized flat knitting, circular knitting, CLO 3D simulation, yarn technology, and garment manufacturing.
                  </p>
                </div>
              </div>
            </div>

            {/* Accolades & Projects (Glassmorphic + Herringbone Weave) */}
            <div className="pt-4">
              <h3 className="text-xl font-bold font-anton uppercase tracking-wide flex items-center gap-2 mb-6">
                <Award size={20} className="text-amber-500" />
                <span>Recognition &amp; Craft Research</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {DESIGNER_INFO.participations.map((part, i) => (
                  <div
                    key={i}
                    className={`rounded-2xl p-4 border backdrop-blur-xl relative overflow-hidden fabric-herringbone shadow-md ${
                      isLight
                        ? "bg-white/85 border-black/10 shadow-black/5"
                        : "bg-[#14161f]/75 border-white/15 shadow-black/40"
                    }`}
                  >
                    <span className="text-[10px] font-mono text-amber-500 font-bold block mb-1">{part.year}</span>
                    <h5 className="text-xs font-bold mb-1.5">{part.title}</h5>
                    <p className={`text-[11px] leading-relaxed ${isLight ? "text-neutral-600" : "text-white/60"}`}>{part.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Skills & Tools Matrix (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <h3 className="text-xl font-bold font-anton uppercase tracking-wide flex items-center gap-2">
              <Wrench size={18} className="text-emerald-500" />
              <span>Technical Toolset</span>
            </h3>

            {/* Tools Grid (Glassmorphic + Mesh Fabric Weave) */}
            <div
              className={`rounded-3xl p-6 shadow-xl space-y-4 border backdrop-blur-2xl relative overflow-hidden fabric-mesh ${
                isLight
                  ? "bg-white/85 border-black/10 shadow-black/5"
                  : "bg-[#14161f]/75 border-white/15 shadow-black/40"
              }`}
            >
              <div className="grid grid-cols-2 gap-3">
                {DESIGNER_INFO.tools.map((tool) => (
                  <div
                    key={tool.name}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      isLight
                        ? "bg-black/[0.03] border-black/10 hover:bg-black/[0.06]"
                        : "bg-white/[0.03] border-white/5 hover:bg-white/10"
                    }`}
                  >
                    <span className="text-[10px] uppercase font-mono text-emerald-500 font-bold block mb-1">
                      {tool.category}
                    </span>
                    <div className="text-sm font-bold mb-1">{tool.name}</div>
                    <p className={`text-[11px] leading-tight ${isLight ? "text-neutral-600" : "text-white/60"}`}>
                      {tool.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Competencies (Glassmorphic + Linen Fabric Weave) */}
            <div
              className={`rounded-3xl p-6 shadow-xl border backdrop-blur-2xl relative overflow-hidden fabric-linen ${
                isLight
                  ? "bg-white/85 border-black/10 shadow-black/5"
                  : "bg-[#14161f]/75 border-white/15 shadow-black/40"
              }`}
            >
              <h4 className={`text-sm font-bold uppercase tracking-wider mb-4 font-mono ${isLight ? "text-neutral-700" : "text-white/80"}`}>
                Core Design Competencies
              </h4>

              <div className="space-y-4">
                {DESIGNER_INFO.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center text-xs mb-1.5">
                      <span className="font-semibold">{skill.name}</span>
                      <span className="font-mono text-emerald-500 text-[11px] font-bold">{skill.level}%</span>
                    </div>
                    <div className={`w-full h-1.5 rounded-full overflow-hidden ${isLight ? "bg-neutral-200" : "bg-white/10"}`}>
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <span className={`text-[10px] block mt-1 ${isLight ? "text-neutral-500" : "text-white/50"}`}>{skill.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};