export default function HeroSection() {
  return (
<section
  id="hero"
  className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-12 pb-8"
>
      <div className="max-w-5xl w-full">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 text-[13px] font-medium"
          style={{
            background: "var(--accent-dim)",
            border: "1px solid var(--accent-border)",
            color: "var(--accent)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: "#c8a96e",
              animation: "pulse 2s infinite",
            }}
          />
          Available for work · Dubai, UAE
        </div>

        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
        `}</style>

        {/* Name */}
        <h1
          className="font-syne font-semibold leading-tight tracking-tight mb-4"
          style={{ fontSize: "clamp(28px,4.5vw,40px)", color: "var(--text)" }}
        >
          Mohammad{" "}
          <span style={{ color: "var(--accent)" }}>Alhussain</span>
        </h1>

        <p
          className="font-syne font-normal mb-5"
          style={{ fontSize: "clamp(18px,3vw,24px)", color: "var(--subtle)" }}
        >
         Platform Engineer &amp; Full-Stack Developer (Mobile, Backend)
        </p>

        <p className="text-base leading-relaxed max-w-[520px] mb-12" style={{ color: "var(--muted)" }}>
        Software engineer focused on mobile applications and backend systems, with experience building scalable products used in real environments. I develop end-to-end solutions, from mobile apps to backend APIs, and contribute to system design and technical leadership to deliver reliable and maintainable platforms.        </p>

        {/* Stats */}
        <div className="flex flex-wrap gap-4 sm:gap-6 mb-12">
          {[
            { num: "8+", label: "Years experience" },
            { num: "8+", label: "Projects shipped" },
            { num: "2", label: "AI implementations" },
          ].map((s) => (
            <div
              key={s.label}
              className="card px-5 py-4 text-center"
              style={{ minWidth: 140 }}
            >
              <div
                className="font-syne font-semibold leading-none mb-1"
                style={{ fontSize: 24, color: "var(--text)" }}
              >
                {s.num}
              </div>
              <div
                className="mt-0.5"
                style={{ fontSize: 14, color: "var(--muted)" }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <a href="#projects" className="btn-primary">View Projects</a>
          <a href="#contact" className="btn-outline">Hire Me</a>
        </div>
      </div>
    </section>
  );
}
