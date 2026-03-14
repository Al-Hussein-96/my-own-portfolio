import { aiProjects } from "@/data/portfolio";

export default function AISection() {
  return (
    <section id="ai" className="relative z-10 min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-5xl w-full">
        <div className="sec-label">Artificial Intelligence</div>
        <h2 className="sec-title">AI Implementations</h2>
        <p className="sec-sub">Integrating LLMs, automation, and intelligent systems into real products.</p>

        <div className="grid sm:grid-cols-3 gap-5">
          {aiProjects.map((a) => (
            <div key={a.title} className="card p-6 hover:-translate-y-1 transition-transform duration-300">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-5"
                style={{ background: "var(--surface2)", border: "1px solid var(--border2)" }}
              >
                {a.icon}
              </div>
              <h3 className="font-syne text-[15px] font-bold mb-3" style={{ color: "var(--text)" }}>
                {a.title}
              </h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--muted)" }}>
                {a.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {a.stack.map((s) => (
                  <span
                    key={s}
                    className="text-[11px] px-3 py-1 rounded-full"
                    style={{
                      background: "var(--surface2)",
                      border: "1px solid var(--border2)",
                      color: "var(--muted)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
