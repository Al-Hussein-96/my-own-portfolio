"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "@/data/portfolio";

export default function ProjectsSection() {
  const [modal, setModal] = useState<{ projectId: string; index: number } | null>(null);

  const openModal = useCallback((projectId: string, index = 0) => {
    setModal({ projectId, index });
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setModal(null);
    document.body.style.overflow = "";
  }, []);

  const activeProject = projects.find((p) => p.id === modal?.projectId) ?? null;

  return (
    <section
      id="projects"
      className="relative z-10 min-h-screen flex items-center justify-center px-6 py-24"
    >
      <div className="max-w-5xl w-full">
        <div className="sec-label">Portfolio</div>
        <h2 className="sec-title">Featured Projects</h2>
        <p className="sec-sub">
          Real-world products I&apos;ve built — from payment backends to mobile experiences.
        </p>

        {/* ── Desktop: two independent masonry columns ── */}
        <div className="hidden sm:flex gap-5 items-start">
          {/* Column 1 — even indexed */}
          <div className="flex flex-col gap-5 flex-1">
            {projects
              .filter((_, i) => i % 2 === 0)
              .map((p) => (
                <ProjectCard key={p.id} project={p} onOpen={openModal} />
              ))}
          </div>
          {/* Column 2 — odd indexed */}
          <div className="flex flex-col gap-5 flex-1">
            {projects
              .filter((_, i) => i % 2 === 1)
              .map((p) => (
                <ProjectCard key={p.id} project={p} onOpen={openModal} />
              ))}
          </div>
        </div>

        {/* ── Mobile: single column ── */}
        <div className="flex flex-col gap-5 sm:hidden">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} onOpen={openModal} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {modal && activeProject && (
          <ProjectModal
            project={activeProject}
            initialIndex={modal.index}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

type Project = (typeof projects)[number];

// ─── SmartImage ───────────────────────────────────────────────────────────────

function SmartImage({
  src,
  alt,
  className,
  style,
}: {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [isPortrait, setIsPortrait] = useState(false);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {isPortrait && (
        <img
          src={src}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full"
          style={{
            objectFit: "cover",
            objectPosition: "center",
            filter: "blur(18px) brightness(0.35) saturate(1.4)",
            transform: "scale(1.1)",
          }}
        />
      )}
      <img
        src={src}
        alt={alt}
        className={className}
        style={{
          ...style,
          objectFit: isPortrait ? "contain" : "cover",
          objectPosition: isPortrait ? "center" : "top center",
        }}
        onLoad={(e) => {
          const img = e.currentTarget;
          setIsPortrait(img.naturalHeight > img.naturalWidth);
        }}
      />
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function ProjectCard({
  project: p,
  onOpen,
}: {
  project: Project;
  onOpen: (id: string, index: number) => void;
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const hasImages = p.images.length > 0;
  const isMobile = p.screenshotType === "mobile";

  return (
    <article className="card group overflow-hidden hover:-translate-y-1.5 transition-transform duration-300">

      {/* ── Hero image area ── */}
      <div
        className="relative overflow-hidden cursor-pointer"
        style={{
          background: "#080c12",
          aspectRatio: isMobile ? "9/16" : "16/9",
        }}
        onClick={() => hasImages && onOpen(p.id, activeIdx)}
      >
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none z-[1]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {hasImages ? (
          <>
            {isMobile ? (
              <>
                {/* Blurred background fill */}
                <img
                  src={p.images[activeIdx]}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 w-full h-full"
                  style={{
                    objectFit: "cover",
                    filter: "blur(20px) brightness(0.25) saturate(1.5)",
                    transform: "scale(1.15)",
                    transition: "opacity 0.5s",
                  }}
                />

                {/* Phone frame */}
                <div
                  className="absolute inset-0 flex items-center justify-center z-[2]"
                  style={{ padding: "20px 0 52px" }}
                >
                  <div
                    className="relative h-full"
                    style={{
                      aspectRatio: "9/19.5",
                      background: "#0d1018",
                      borderRadius: "28px",
                      border: "1.5px solid rgba(255,255,255,0.12)",
                      overflow: "hidden",
                      boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
                    }}
                  >
                    {/* Notch */}
                    <div
                      className="absolute top-0 left-1/2 -translate-x-1/2 z-10"
                      style={{
                        width: "72px",
                        height: "22px",
                        background: "#080c12",
                        borderRadius: "0 0 14px 14px",
                      }}
                    />
                    {/* Screenshots inside phone */}
                    {p.images.map((src, i) => (
                      <img
                        key={src}
                        src={src}
                        alt={`${p.title} screenshot ${i + 1}`}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full transition-opacity duration-500"
                        style={{
                          opacity: i === activeIdx ? 1 : 0,
                          objectFit: "cover",
                          objectPosition: "top center",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Pill dots navigation */}
                {p.images.length > 1 && (
                  <div
                    className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-[3]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {p.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveIdx(i)}
                        className="transition-all duration-300"
                        style={{
                          width: i === activeIdx ? "18px" : "6px",
                          height: "6px",
                          borderRadius: "3px",
                          background:
                            i === activeIdx
                              ? "rgba(255,255,255,0.85)"
                              : "rgba(255,255,255,0.25)",
                        }}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Desktop: full bleed + thumbnail strip */}
                {p.images.map((src, i) => (
                  <div
                    key={src}
                    className="absolute inset-0 transition-opacity duration-500 z-[2]"
                    style={{ opacity: i === activeIdx ? 1 : 0 }}
                  >
                    <SmartImage
                      src={src}
                      alt={`${p.title} screenshot ${i + 1}`}
                      className="absolute inset-0 w-full h-full"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ))}

                {/* Bottom gradient */}
                <div
                  className="absolute bottom-0 left-0 right-0 pointer-events-none z-[3]"
                  style={{
                    height: "64px",
                    background:
                      "linear-gradient(to bottom, transparent, rgba(8,12,18,0.96))",
                  }}
                />

                {/* Thumbnail strip */}
                {p.images.length > 1 && (
                  <div
                    className="absolute bottom-0 left-0 right-0 flex gap-1.5 px-3 pb-2 z-[4]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {p.images.map((src, i) => (
                      <button
                        key={src}
                        onClick={() => setActiveIdx(i)}
                        className="relative rounded overflow-hidden transition-all duration-200 hover:opacity-90"
                        style={{
                          flex: "1 1 0",
                          height: "28px",
                          outline:
                            i === activeIdx
                              ? "1.5px solid rgba(255,255,255,0.8)"
                              : "1px solid rgba(255,255,255,0.15)",
                          opacity: i === activeIdx ? 1 : 0.5,
                        }}
                      >
                        <img
                          src={src}
                          alt=""
                          className="w-full h-full object-cover object-top"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Counter — top left (both types) */}
            <div className="absolute top-3 left-3 z-[4]">
              <span
                className="text-[11px] px-2 py-0.5 rounded"
                style={{
                  background: "rgba(0,0,0,0.55)",
                  border: "0.5px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                {activeIdx + 1} / {p.images.length}
              </span>
            </div>

            {/* Expand hint — top right (both types) */}
            <div
              className="absolute top-3 right-3 z-[4] opacity-0 group-hover:opacity-100
                         translate-y-1 group-hover:translate-y-0 transition-all duration-200"
            >
              <span
                className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded"
                style={{
                  background: "rgba(0,0,0,0.6)",
                  border: "0.5px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.75)",
                  backdropFilter: "blur(6px)",
                }}
              >
                <ExpandIcon />
                Expand
              </span>
            </div>
          </>
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-5xl z-[2]">
            {p.icon}
          </span>
        )}
      </div>

      {/* ── Body ── */}
      <div className="p-6">
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

        <h3 className="font-syne text-lg font-bold mb-1" style={{ color: "var(--text)" }}>
          {p.title}
        </h3>
        <p className="text-xs mb-1" style={{ color: "var(--subtle)" }}>
          {p.subtitle}
        </p>
        <p
          className="flex items-center gap-1.5 text-xs mb-4"
          style={{ color: "var(--muted)" }}
        >
          <span>{p.company === "Personal" ? "👤" : "🏢"}</span>
          <span>{p.company}</span>
        </p>
        <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--muted)" }}>
          {p.description}
        </p>

        <div className="flex gap-5 flex-wrap">
          {hasImages && (
            <button
              onClick={() => onOpen(p.id, activeIdx)}
              className="text-[13px] transition-opacity hover:opacity-70"
              style={{ color: "var(--accent)" }}
            >
              ↗ Screenshots
            </button>
          )}
          {p.github && (
            <a
              href={p.github}
              className="text-[13px] transition-opacity hover:opacity-70"
              style={{ color: "var(--muted)" }}
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
              ↗ Live
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function ProjectModal({
  project: p,
  initialIndex,
  onClose,
}: {
  project: Project;
  initialIndex: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(initialIndex);
  const [direction, setDirection] = useState(0);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const navigate = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(p.images.length - 1, next));
      if (clamped === idx) return;
      setDirection(next > idx ? 1 : -1);
      setIdx(clamped);
      const el = thumbsRef.current?.children[clamped] as HTMLElement;
      el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    },
    [idx, p.images.length]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") navigate(idx + 1);
      if (e.key === "ArrowLeft") navigate(idx - 1);
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [idx, navigate, onClose]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <>
      <motion.div
        className="fixed inset-0 z-50"
        style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(12px)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        className="fixed inset-x-0 bottom-0 z-50 flex flex-col"
        style={{
          background: "#0a0e16",
          border: "0.5px solid rgba(255,255,255,0.08)",
          borderRadius: "16px 16px 0 0",
          height: "88vh",
        }}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 32, stiffness: 320 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 flex-shrink-0"
          style={{ borderBottom: "0.5px solid rgba(255,255,255,0.07)" }}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{p.icon}</span>
            <div>
              <h3
                className="font-syne font-bold text-base"
                style={{ color: "rgba(255,255,255,0.92)" }}
              >
                {p.title}
              </h3>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                {idx + 1} / {p.images.length}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(idx - 1)}
              disabled={idx === 0}
              className="w-8 h-8 flex items-center justify-center rounded-md transition-colors"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "0.5px solid rgba(255,255,255,0.1)",
                color: idx === 0 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.7)",
              }}
            >
              ←
            </button>
            <button
              onClick={() => navigate(idx + 1)}
              disabled={idx === p.images.length - 1}
              className="w-8 h-8 flex items-center justify-center rounded-md transition-colors"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "0.5px solid rgba(255,255,255,0.1)",
                color:
                  idx === p.images.length - 1
                    ? "rgba(255,255,255,0.2)"
                    : "rgba(255,255,255,0.7)",
              }}
            >
              →
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-md ml-1 transition-colors hover:bg-white/10"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "0.5px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Main image */}
        <div
          className="flex-1 relative overflow-hidden"
          style={{ background: "#060910", minHeight: 0 }}
        >
          <AnimatePresence custom={direction} mode="popLayout">
            <motion.div
              key={idx}
              className="absolute inset-0 flex items-center justify-center p-4"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="relative w-full h-full">
                <SmartImage
                  src={p.images[idx]}
                  alt={`${p.title} screenshot ${idx + 1}`}
                  className="absolute inset-0 w-full h-full"
                  style={{ objectFit: "contain", borderRadius: "6px" }}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Thumbnail strip */}
        <div
          className="flex-shrink-0 px-4 py-3"
          style={{ borderTop: "0.5px solid rgba(255,255,255,0.07)" }}
        >
          <div
            ref={thumbsRef}
            className="flex gap-2 overflow-x-auto pb-1"
            style={{ scrollbarWidth: "none" }}
          >
            {p.images.map((src, i) => (
              <button
                key={src}
                onClick={() => navigate(i)}
                className="flex-shrink-0 rounded overflow-hidden transition-all duration-200"
                style={{
                  width: 72,
                  height: 46,
                  outline:
                    i === idx
                      ? "1.5px solid rgba(255,255,255,0.75)"
                      : "1px solid rgba(255,255,255,0.1)",
                  opacity: i === idx ? 1 : 0.45,
                  transform: i === idx ? "scale(1.04)" : "scale(1)",
                }}
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover object-top"
                />
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function ExpandIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M3 3h4M3 3v4M13 13h-4M13 13v-4M3 13h4M3 13v-4M13 3h-4M13 3v4" />
    </svg>
  );
}