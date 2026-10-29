"use client";

/**
 * The team leader's join form — the web twin of the mobile app's join screen,
 * ported from the (undeployed) ligatech-dashboard and made dependency-free:
 * plain fetch against the same-origin /api/v1 rewrite, plain React state, and
 * the portfolio's own design tokens so the page belongs to this site.
 *
 * Universal/App Links normally open the app before this page ever renders;
 * this is the landing for browsers, in-app webviews, and people without the
 * app installed.
 */

import { useEffect, useMemo, useState } from "react";

interface Enrollment {
  teamId: string;
  teamName: string;
  logoUrl: string | null;
  leagueName: string;
  leagueStatus: string | null;
  maxPlayersPerTeam: number;
}

interface Player {
  id: string;
  fullName: string;
  jerseyNumber: number | null;
}

interface Row {
  id: number;
  fullName: string;
  jerseyNumber: string;
  phoneNumber: string;
  status: "idle" | "saving" | "saved" | "error";
  /** The server's own words for why this row was refused. */
  error?: string;
}

const MESSAGES = {
  en: {
    invalidLink: "Invalid invite link",
    invalidLinkDesc: "This invite link is invalid or has expired.",
    registrationClosed: "Registration closed",
    registrationClosedDesc: "This league has started — no more players can be added.",
    squadFull: "Squad is full",
    squadFullDesc: (n: number, max: number) => `already has ${n} of ${max} players registered.`,
    allAdded: "Players added!",
    allAddedDesc: "All players have been added to",
    addPlayers: "Add Players",
    addingTo: "Adding players to",
    spots: (n: number) => (n === 1 ? "1 spot remaining" : `${n} spots remaining`),
    alreadyRegistered: (n: number) => `Already registered (${n})`,
    fullName: "Full name",
    phone: "Phone (optional)",
    phoneTip: "A phone number links the player's stats across leagues — it is never shown publicly.",
    jersey: "Shirt no.",
    addAnother: "Add another player",
    remove: "Remove",
    saving: "Saving players…",
    addButton: (n: number, team: string) => `Add ${n || ""} player${n === 1 ? "" : "s"} to ${team}`,
    atLeastOne: "Enter at least one player name.",
    onlyNSpots: (n: number) => `Only ${n} spot${n === 1 ? "" : "s"} remaining.`,
    someFailed: (n: number) => `${n} player${n === 1 ? "" : "s"} failed to save — fix and submit again.`,
    openInApp: "Open in the Nalaab app",
    getOnPlay: "Get the app on Google Play",
    getOnAppStore: "Download the app on the App Store",
    badJersey: "Shirt number must be between 1 and 99.",
    addLogo: "Add team logo",
    changeLogo: "Change team logo",
    logoTooBig: "The image must be 5MB or smaller.",
    poweredBy: "Powered by LigaTech · This link was shared by your team's organizer",
    toggle: "العربية",
  },
  ar: {
    invalidLink: "رابط دعوة غير صالح",
    invalidLinkDesc: "هذا الرابط غير صالح أو انتهت صلاحيته.",
    registrationClosed: "التسجيل مغلق",
    registrationClosedDesc: "بدأ هذا الدوري — لا يمكن إضافة لاعبين جدد.",
    squadFull: "الفريق مكتمل",
    squadFullDesc: (n: number, max: number) => `لديه بالفعل ${n} من أصل ${max} لاعباً مسجلاً.`,
    allAdded: "تمت إضافة اللاعبين!",
    allAddedDesc: "تمت إضافة جميع اللاعبين إلى",
    addPlayers: "إضافة لاعبين",
    addingTo: "إضافة لاعبين إلى",
    spots: (n: number) => (n === 1 ? "مقعد واحد متبقٍّ" : `${n} مقاعد متبقية`),
    alreadyRegistered: (n: number) => `المسجّلون بالفعل (${n})`,
    fullName: "الاسم الكامل",
    phone: "الهاتف (اختياري)",
    phoneTip: "رقم الهاتف يربط إحصائيات اللاعب عبر الدوريات — ولا يظهر علناً أبداً.",
    jersey: "رقم القميص",
    addAnother: "إضافة لاعب آخر",
    remove: "إزالة",
    saving: "جارٍ الحفظ…",
    addButton: (n: number, team: string) => `إضافة ${n || ""} لاعبين إلى ${team}`,
    atLeastOne: "أدخل اسم لاعب واحد على الأقل.",
    onlyNSpots: (n: number) => `${n} مقاعد متبقية فقط.`,
    someFailed: (n: number) => `فشل حفظ ${n} لاعبين — صحّح وأعد الإرسال.`,
    openInApp: "افتح في تطبيق نلعب",
    getOnPlay: "حمّل التطبيق من Google Play",
    getOnAppStore: "حمّل التطبيق من App Store",
    badJersey: "يجب أن يكون رقم القميص بين 1 و99.",
    addLogo: "أضف شعار الفريق",
    changeLogo: "غيّر شعار الفريق",
    logoTooBig: "يجب ألا يتجاوز حجم الصورة 5 ميغابايت.",
    poweredBy: "مدعوم من LigaTech · شارك منظم فريقك هذا الرابط",
    toggle: "English",
  },
};

/** Arabic-Indic digits → ASCII, so the server's phone pattern accepts them. */
function normalizePhone(value: string): string | null {
  const ascii = value.replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660)).trim();
  return ascii || null;
}

let nextId = 1;
const newRow = (): Row => ({ id: nextId++, fullName: "", jerseyNumber: "", phoneNumber: "", status: "idle" });

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.alhussain.ligatech";

// Where uploaded images are served from. The backend names its own host in
// logoUrl (sometimes "localhost"), so only the path is trusted and re-based —
// the same rule the mobile app's absoluteMediaUrl applies.
const MEDIA_ORIGIN = "https://ligatech-api.mohammadalhussain.com";
function mediaUrl(url: string): string {
  const schemeAt = url.indexOf("://");
  const path = schemeAt < 0 ? url : url.slice(url.indexOf("/", schemeAt + 3));
  return `${MEDIA_ORIGIN}/${path.replace(/^\//, "")}`;
}

const MAX_LOGO_BYTES = 5 * 1024 * 1024;
// Empty until the app ships on the App Store — the iOS badge stays hidden so
// the page never links to a listing that does not exist. Fill in
// https://apps.apple.com/app/id<APPLE_ID> when it goes live.
const APP_STORE_URL = "";

export default function JoinClient({ inviteToken }: { inviteToken: string }) {
  const [locale, setLocale] = useState<"en" | "ar">("en");
  const t = MESSAGES[locale];
  const isRtl = locale === "ar";

  const [team, setTeam] = useState<Enrollment | null>(null);
  const [existing, setExisting] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [rows, setRows] = useState<Row[]>([newRow()]);
  const [submitting, setSubmitting] = useState(false);
  const [allSaved, setAllSaved] = useState(false);
  const [banner, setBanner] = useState<string | null>(null);
  const [logoBusy, setLogoBusy] = useState(false);

  // Which store badge to show. UA sniffing is fine here: getting it wrong
  // just shows the other store's badge, and desktop shows whatever exists.
  const [platform, setPlatform] = useState<"android" | "ios" | "other">("other");

  useEffect(() => {
    if (typeof navigator === "undefined") return;
    if (navigator.language?.startsWith("ar")) setLocale("ar");
    const ua = navigator.userAgent;
    if (/android/i.test(ua)) setPlatform("android");
    else if (/iPhone|iPad|iPod/i.test(ua)) setPlatform("ios");
  }, []);

  useEffect(() => {
    Promise.all([
      fetch(`/api/v1/teams/join/${inviteToken}`).then((r) => (r.ok ? r.json() : Promise.reject(r))),
      fetch(`/api/v1/teams/join/${inviteToken}/players`).then((r) => (r.ok ? r.json() : Promise.reject(r))),
    ])
      .then(([teamData, players]) => {
        setTeam(teamData);
        setExisting(players);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [inviteToken]);

  const spotsLeft = team ? team.maxPlayersPerTeam - existing.length : 0;
  const isLocked = team?.leagueStatus === "Active" || team?.leagueStatus === "Completed";
  const filledCount = useMemo(() => rows.filter((r) => r.fullName.trim() && r.status !== "saved").length, [rows]);
  const deepLink = `ligatech://join/${inviteToken}`;

  const uploadLogo = async (file: File) => {
    if (!team || logoBusy) return;
    if (file.size > MAX_LOGO_BYTES) return setBanner(t.logoTooBig);
    setLogoBusy(true);
    setBanner(null);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch(`/api/v1/teams/join/${inviteToken}/logo`, { method: "POST", body: form });
      if (!res.ok) {
        const detail = await res.json().then((b: { message?: string }) => b?.message).catch(() => undefined);
        setBanner(detail ?? `${res.status}`);
      } else {
        const updated: { logoUrl: string | null } = await res.json();
        setTeam({ ...team, logoUrl: updated.logoUrl });
      }
    } finally {
      setLogoBusy(false);
    }
  };

  const updateRow = (id: number, patch: Partial<Row>) =>
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...patch, status: "idle", error: undefined } : r))
    );

  const addRow = () => {
    if (!team) return;
    if (existing.length + filledCount >= team.maxPlayersPerTeam) {
      setBanner(t.onlyNSpots(spotsLeft));
      return;
    }
    setRows((prev) => [...prev, newRow()]);
  };

  const removeRow = (id: number) =>
    setRows((prev) => (prev.length > 1 ? prev.filter((r) => r.id !== id) : prev));

  const submit = async () => {
    if (!team || submitting) return;
    setBanner(null);

    // Saved rows are excluded so a retry after a partial failure cannot
    // re-post players that already succeeded.
    const pending = rows.filter((r) => r.fullName.trim() && r.status !== "saved");
    if (pending.length === 0) return setBanner(t.atLeastOne);
    if (pending.length > spotsLeft) return setBanner(t.onlyNSpots(spotsLeft));

    // The server rejects a jersey outside 1–99; catching it here keeps the
    // row editable with a message in the user's language instead of a
    // round-trip that comes back in English.
    const badJersey = pending.find((r) => {
      if (!r.jerseyNumber) return false;
      const n = Number(r.jerseyNumber);
      return !Number.isInteger(n) || n < 1 || n > 99;
    });
    if (badJersey) {
      setRows((prev) =>
        prev.map((r) => (r.id === badJersey.id ? { ...r, status: "error", error: t.badJersey } : r))
      );
      return setBanner(t.badJersey);
    }

    setSubmitting(true);
    setRows((prev) => prev.map((r) => (pending.some((p) => p.id === r.id) ? { ...r, status: "saving" } : r)));

    const results = await Promise.allSettled(
      pending.map(async (row) => {
        const res = await fetch(`/api/v1/teams/join/${inviteToken}/players`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: row.fullName.trim(),
            jerseyNumber: row.jerseyNumber ? Number(row.jerseyNumber) : null,
            phoneNumber: normalizePhone(row.phoneNumber),
          }),
        });
        if (!res.ok) {
          // The backend answers validation failures with a human-readable
          // message ("phoneNumber: Invalid phone number format") — show that
          // on the row rather than a generic count.
          const detail = await res
            .json()
            .then((b: { message?: string }) => b?.message)
            .catch(() => undefined);
          setRows((prev) =>
            prev.map((r) => (r.id === row.id ? { ...r, status: "error", error: detail } : r))
          );
          throw new Error(detail ?? String(res.status));
        }
        const player: Player = await res.json();
        setExisting((prev) => [...prev, player]);
        setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, status: "saved", error: undefined } : r)));
      })
    );

    setSubmitting(false);
    const failed = results.filter((r) => r.status === "rejected").length;
    if (failed === 0) {
      setAllSaved(true);
    } else {
      setBanner(t.someFailed(failed));
    }
  };

  const shell = (content: React.ReactNode) => (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen py-10 px-4">
      <button
        onClick={() => setLocale(locale === "en" ? "ar" : "en")}
        className="fixed top-4 end-4 z-10 text-xs px-3 py-1.5 rounded-md border transition-colors"
        style={{ borderColor: "var(--border2)", color: "var(--muted)", background: "var(--surface)" }}
      >
        {t.toggle}
      </button>
      <div className="max-w-lg mx-auto">{content}</div>
    </div>
  );

  const notice = (title: string, desc: React.ReactNode) =>
    shell(
      <div className="text-center mt-24">
        <p className="text-2xl font-semibold mb-2" style={{ color: "var(--text)" }}>{title}</p>
        <p className="text-sm" style={{ color: "var(--muted)" }}>{desc}</p>
      </div>
    );

  if (loading)
    return shell(
      <p className="text-center mt-24 text-sm" style={{ color: "var(--muted)" }}>…</p>
    );
  if (notFound || !team) return notice(t.invalidLink, t.invalidLinkDesc);
  if (isLocked) return notice(t.registrationClosed, t.registrationClosedDesc);
  if (allSaved)
    return notice(`✓ ${t.allAdded}`, <>{t.allAddedDesc} <strong style={{ color: "var(--text)" }}>{team.teamName}</strong>.</>);
  if (spotsLeft <= 0)
    return notice(t.squadFull, <><strong style={{ color: "var(--text)" }}>{team.teamName}</strong> {t.squadFullDesc(existing.length, team.maxPlayersPerTeam)}</>);

  const inputStyle = {
    background: "var(--surface2)",
    borderColor: "var(--border2)",
    color: "var(--text)",
  } as const;

  return shell(
    <>
      {/* Escape hatch for in-app browsers that swallow App/Universal Links. */}
      <a
        href={deepLink}
        className="w-full flex items-center justify-center gap-2 py-2.5 mb-2 text-sm font-medium rounded-lg border transition-colors"
        style={{ borderColor: "var(--border2)", color: "var(--muted)", background: "var(--surface)" }}
      >
        📱 {t.openInApp}
      </a>

      {/* The store badge for whoever landed here WITHOUT the app — the OS only
          shows this page when the app did not intercept the link. Platform-
          matched; desktop gets every store that exists. */}
      <div className="mb-8 space-y-2">
        {platform !== "ios" && (
          <a
            href={PLAY_STORE_URL}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg"
            style={{ background: "var(--surface2)", color: "#21c25e", border: "1px solid var(--border2)" }}
          >
            ▶ {t.getOnPlay}
          </a>
        )}
        {platform !== "android" && APP_STORE_URL && (
          <a
            href={APP_STORE_URL}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg"
            style={{ background: "var(--surface2)", color: "#21c25e", border: "1px solid var(--border2)" }}
          >
             {t.getOnAppStore}
          </a>
        )}
      </div>

      <div className="text-center mb-8">
        {/* The badge is a big tappable upload target, and the button below
            spells the action out — the token authorizes the write, same as
            adding players. */}
        <label className="cursor-pointer inline-block">
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            disabled={logoBusy}
            onChange={(e) => {
              const f = e.target.files?.[0];
              e.target.value = "";
              if (f) uploadLogo(f);
            }}
          />
          {team.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={mediaUrl(team.logoUrl)}
              alt={team.teamName}
              className="w-24 h-24 rounded-2xl object-contain mx-auto mb-3"
              style={{ background: "var(--surface)", opacity: logoBusy ? 0.5 : 1 }}
            />
          ) : (
            <div
              className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-3 font-bold text-3xl"
              style={{
                background: "linear-gradient(135deg,#21c25e,#087443)",
                color: "#fff",
                opacity: logoBusy ? 0.5 : 1,
              }}
            >
              {team.teamName.slice(0, 2).toUpperCase()}
            </div>
          )}
          <span
            className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-xl text-sm font-semibold border transition-colors"
            style={{ background: "var(--surface2)", color: "#21c25e", borderColor: "#21c25e" }}
          >
            {logoBusy ? "…" : `${team.logoUrl ? "🖼" : "＋"} ${team.logoUrl ? t.changeLogo : t.addLogo}`}
          </span>
        </label>
        <h1 className="text-2xl font-semibold mb-1" style={{ color: "var(--text)" }}>{t.addPlayers}</h1>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          {t.addingTo} <strong style={{ color: "var(--text)" }}>{team.teamName}</strong> · {team.leagueName}
        </p>
        <p className="text-xs mt-1" style={{ color: "#21c25e" }}>{t.spots(spotsLeft)}</p>
      </div>

      {existing.length > 0 && (
        <div className="rounded-xl border overflow-hidden mb-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <p className="px-4 py-3 text-xs font-medium uppercase tracking-wide border-b" style={{ color: "var(--muted)", borderColor: "var(--border)" }}>
            {t.alreadyRegistered(existing.length)}
          </p>
          {existing.map((p, i) => (
            <div key={p.id} className="flex items-center justify-between px-4 py-2.5 border-b last:border-b-0" style={{ borderColor: "var(--border)" }}>
              <span className="text-sm" style={{ color: "var(--text)" }}>
                <span className="text-xs me-3" style={{ color: "var(--subtle)" }}>{i + 1}</span>
                {p.fullName}
              </span>
              {p.jerseyNumber != null && (
                <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "var(--surface2)", color: "var(--muted)" }}>
                  #{p.jerseyNumber}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      <p className="text-xs mb-4 px-1" style={{ color: "var(--subtle)" }}>ⓘ {t.phoneTip}</p>

      <div className="space-y-3 mb-4">
        {rows.map((row) => (
          <div
            key={row.id}
            className="rounded-xl border p-4 space-y-3"
            style={{
              background: "var(--surface)",
              borderColor: row.status === "saved" ? "#21c25e" : row.status === "error" ? "#e5484d" : "var(--border)",
            }}
          >
            <input
              placeholder={t.fullName}
              value={row.fullName}
              disabled={row.status === "saved" || submitting}
              onChange={(e) => updateRow(row.id, { fullName: e.target.value })}
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-[#21c25e]"
              style={inputStyle}
            />
            <div className="flex gap-3">
              <input
                type="number"
                min={1}
                max={99}
                placeholder={t.jersey}
                value={row.jerseyNumber}
                disabled={row.status === "saved" || submitting}
                onChange={(e) => updateRow(row.id, { jerseyNumber: e.target.value.slice(0, 2) })}
                className="w-2/5 rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-[#21c25e]"
                style={inputStyle}
              />
              <input
                type="tel"
                placeholder={t.phone}
                value={row.phoneNumber}
                disabled={row.status === "saved" || submitting}
                onChange={(e) => updateRow(row.id, { phoneNumber: e.target.value })}
                className="w-3/5 rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-[#21c25e]"
                style={inputStyle}
              />
            </div>
            {rows.length > 1 && row.status !== "saved" && (
              <button onClick={() => removeRow(row.id)} disabled={submitting} className="text-xs" style={{ color: "var(--subtle)" }}>
                ✕ {t.remove}
              </button>
            )}
            {row.status === "saved" && <p className="text-xs" style={{ color: "#21c25e" }}>✓</p>}
            {row.status === "error" && row.error && (
              <p className="text-xs" style={{ color: "#e5484d" }}>{row.error}</p>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={addRow}
        disabled={submitting}
        className="w-full py-2.5 mb-6 text-sm rounded-lg border border-dashed transition-colors disabled:opacity-50"
        style={{ borderColor: "var(--border2)", color: "var(--muted)" }}
      >
        + {t.addAnother}
      </button>

      {banner && (
        <p className="text-sm text-center mb-4 cursor-pointer" style={{ color: "#e5484d" }} onClick={() => setBanner(null)}>
          {banner}
        </p>
      )}

      <button
        onClick={submit}
        disabled={submitting}
        className="w-full py-3.5 rounded-xl font-semibold text-white transition-opacity disabled:opacity-60"
        style={{ background: "linear-gradient(135deg,#21c25e,#087443)" }}
      >
        {submitting ? t.saving : t.addButton(filledCount, team.teamName)}
      </button>

      <p className="text-center text-xs mt-5" style={{ color: "var(--subtle)" }}>{t.poweredBy}</p>
    </>
  );
}
