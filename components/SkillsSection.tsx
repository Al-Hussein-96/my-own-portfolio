"use client";

import { useState } from "react";
import { skills, skillCategories } from "@/data/portfolio";

export default function SkillsSection() {
  const [active, setActive] = useState("mobile");
  const filtered = active === "all" ? skills : skills.filter((s) => s.cat === active);

  return (
    <section id="skills" className="relative z-10 min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-5xl w-full">
        <div className="sec-label">Expertise</div>
        <h2 className="sec-title">Skills &amp; Technologies</h2>
        <p className="sec-sub">
          Mobile and backend skills, paired with cloud, DevOps, and workflow tooling.
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {skillCategories.map((c) => (
            <button
              key={c.key}
              onClick={() => setActive(c.key)}
              className="px-5 py-2 rounded-full text-[13px] font-medium transition-all duration-200"
              style={{
                background: active === c.key ? "var(--accent-dim)" : "transparent",
                border: active === c.key ? "1px solid var(--accent-border)" : "1px solid var(--border)",
                color: active === c.key ? "var(--accent)" : "var(--muted)",
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filtered.map((s) => (
            <div
              key={s.name}
              className="card p-5 text-center hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="text-2xl mb-3">{s.icon}</div>
              <div className="text-sm font-medium mb-1" style={{ color: "var(--text)" }}>{s.name}</div>
              <div className="text-xs mb-3" style={{ color: "var(--subtle)" }}>{s.level}</div>
              <div className="h-[2px] rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${s.pct}%`, background: "#c8a96e" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
