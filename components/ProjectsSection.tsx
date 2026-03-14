import { projects } from "@/data/portfolio";

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative z-10 min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-5xl w-full">
        <div className="sec-label">Portfolio</div>
        <h2 className="sec-title">Featured Projects</h2>
        <p className="sec-sub">Real-world products I&apos;ve built — from payment backends to mobile experiences.</p>

        <div className="grid sm:grid-cols-2 gap-5">
          {projects.map((p) => (
            <article
              key={p.id}
              className="card overflow-hidden hover:-translate-y-1.5 transition-transform duration-300"
            >
              {/* Visual */}
              <div
                className="h-40 flex items-center justify-center relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, #111418, #0d1018)" }}
              >
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: "radial-gradient(circle at 1px 1px, #c8a96e 1px, transparent 0)",
                    backgroundSize: "28px 28px",
                  }}
                />
                <span className="text-5xl z-10">{p.icon}</span>
              </div>

              {/* Body */}
              <div className="p-6">
                {/* Stack tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.stack.map((t, i) => (
                    <span
                      key={t}
                      className="text-[11px] font-medium px-3 py-1 rounded-full"
                      style={
                        i === 0
                          ? {
                              background: "var(--accent-dim)",
                              border: "1px solid var(--accent-border)",
                              color: "var(--accent)",
                            }
                          : {
                              background: "var(--surface2)",
                              border: "1px solid var(--border2)",
                              color: "var(--muted)",
                            }
                      }
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3
                  className="font-syne text-lg font-bold mb-1"
                  style={{ color: "var(--text)" }}
                >
                  {p.title}
                </h3>

                {/* Subtitle */}
                <p className="text-xs mb-1" style={{ color: "var(--subtle)" }}>
                  {p.subtitle}
                </p>

                {/* Company */}
                <p
                  className="flex items-center gap-1.5 text-xs mb-4"
                  style={{ color: "var(--muted)" }}
                >
                  <span>{p.company === "Personal" ? "👤" : "🏢"}</span>
                  <span>{p.company}</span>
                </p>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed mb-5"
                  style={{ color: "var(--muted)" }}
                >
                  {p.description}
                </p>

                {/* Links */}
                {(p.github || p.live) && (
                  <div className="flex gap-5">
                    {p.github && (
                      <a
                        href={p.github}
                        className="text-[13px] transition-opacity hover:opacity-70"
                        style={{ color: "var(--accent)" }}
                      >
                        ↗ GitHub
                      </a>
                    )}
                    {p.live && (
                      <a
                        href={p.live}
                        className="text-[13px] transition-opacity hover:opacity-70"
                        style={{ color: "var(--muted)" }}
                      >
                        ↗ Live Demo
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}