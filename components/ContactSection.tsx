import { contactLinks } from "@/data/portfolio";

export default function ContactSection() {
  return (
    <section id="contact" className="relative z-10 flex items-center justify-center px-6 py-24 min-h-screen">
      <div className="max-w-5xl w-full">
        <div className="sec-label">Get in touch</div>
        <h2 className="sec-title">Let&apos;s Work Together</h2>
        <p className="text-base leading-relaxed mb-10 max-w-xl" style={{ color: "var(--muted)" }}>
          Whether you have a project in mind, want to collaborate, or just want to
          say hi — my inbox is always open.
        </p>

        <div className="grid sm:grid-cols-2 gap-3">
          {contactLinks.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200"
              style={{ textDecoration: "none" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-base shrink-0"
                style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}
              >
                {c.icon}
              </div>
              <div>
                <div className="text-sm font-medium" style={{ color: "var(--text)" }}>
                  {c.label}
                </div>
                <div className="text-xs mt-0.5" style={{ color: "var(--subtle)" }}>
                  {c.sub}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        className="absolute bottom-0 left-0 right-0 text-center py-8 text-xs"
        style={{ color: "var(--subtle)", borderTop: "1px solid var(--border)" }}
      >
        Built with Next.js &amp; Tailwind CSS · Mohammad Al-Hussein © 2026
      </div>
    </section>
  );
}