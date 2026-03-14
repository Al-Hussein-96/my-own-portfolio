"use client";

export default function ContactForm() {
  return (
    <div className="card p-8">
      <div className="mb-5">
        <label className="block text-xs mb-2" style={{ color: "var(--muted)" }}>
          Name
        </label>
        <input
          type="text"
          placeholder="Your name"
          className="contact-input w-full text-sm px-4 py-3 rounded-xl outline-none"
          style={{
            background: "var(--surface2)",
            border: "1px solid var(--border)",
            color: "var(--text)",
          }}
        />
      </div>
      <div className="mb-5">
        <label className="block text-xs mb-2" style={{ color: "var(--muted)" }}>
          Email
        </label>
        <input
          type="email"
          placeholder="your@email.com"
          className="contact-input w-full text-sm px-4 py-3 rounded-xl outline-none"
          style={{
            background: "var(--surface2)",
            border: "1px solid var(--border)",
            color: "var(--text)",
          }}
        />
      </div>
      <div className="mb-7">
        <label className="block text-xs mb-2" style={{ color: "var(--muted)" }}>
          Message
        </label>
        <textarea
          rows={5}
          placeholder="Tell me about your project..."
          className="contact-input w-full text-sm px-4 py-3 rounded-xl outline-none resize-none"
          style={{
            background: "var(--surface2)",
            border: "1px solid var(--border)",
            color: "var(--text)",
          }}
        />
      </div>
      <button className="btn-primary w-full justify-center">Send Message ↗</button>

      <style>{`
        .contact-input:focus { border-color: rgba(200,169,110,0.4) !important; }
        .contact-link:hover { background: #181818; }
      `}</style>
    </div>
  );
}
