import { blogPosts } from "@/data/portfolio";

export default function BlogSection() {
  return (
    <section id="blog" className="relative z-10 min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-5xl w-full">
        <div className="sec-label">Writing</div>
        <h2 className="sec-title">Medium Articles</h2>
        <p className="sec-sub">Sharing what I learn — backend architecture, reactive systems, and AI engineering.</p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {blogPosts.map((b) => (
            <a
              key={b.title}
              href={b.url}
              target="_blank"
              rel="noreferrer"
              className="card p-6 flex flex-col hover:-translate-y-1 transition-all duration-300 group"
              style={{ textDecoration: "none" }}
            >
              <div className="text-[11px] mb-3" style={{ color: "var(--subtle)" }}>
                {b.date}
              </div>
              <span
                className="self-start text-[11px] font-medium px-3 py-1 rounded-full mb-4"
                style={{
                  background: "var(--accent-dim)",
                  border: "1px solid var(--accent-border)",
                  color: "var(--accent)",
                }}
              >
                {b.tag}
              </span>
              <h3 className="font-syne text-[15px] font-bold leading-snug mb-3" style={{ color: "var(--text)" }}>
                {b.title}
              </h3>
              <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: "var(--muted)" }}>
                {b.excerpt}
              </p>
              <span
                className="text-[13px] transition-opacity group-hover:opacity-70"
                style={{ color: "var(--accent)" }}
              >
                ↗ Read on Medium
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
