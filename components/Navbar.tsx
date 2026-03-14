"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#hero",     label: "Home"     },
  { href: "#skills",   label: "Skills"   },
  { href: "#projects", label: "Projects" },
  // { href: "#ai",       label: "AI"       },
  { href: "#blog",     label: "Blog"     },
  { href: "#contact",  label: "Contact"  },
];

export default function Navbar() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      const ids = links.map((l) => l.href.slice(1));
      let current = "hero";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 220) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex gap-1 px-3 py-1.5 rounded-full border backdrop-blur-md shadow-sm"
      style={{ background: "rgba(5,6,12,0.85)", borderColor: "rgba(38,43,58,0.7)" }}
    >
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          className="px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200"
          style={{
            color: active === l.href.slice(1) ? "#f3f4f6" : "#9ca3b5",
            background:
              active === l.href.slice(1)
                ? "rgba(38,43,58,0.9)"
                : "transparent",
          }}
        >
          {l.label}
        </a>
      ))}
    </nav>
  );
}
