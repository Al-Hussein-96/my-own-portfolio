"use client";

import { useEffect, useState } from "react";

// A player-run team's invite. There is nothing to fetch: the code is the whole
// invite, and the app (not this page) does the joining. If the app is installed
// the OS opens it before this page ever shows; this is the fallback for a phone
// without it, or a desktop.
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.alhussain.ligatech";
// Filled in when the iOS app is live: https://apps.apple.com/app/id<APPLE_ID>
const APP_STORE_URL = "";

const MESSAGES = {
  en: {
    title: "You are invited to a team",
    body: "Open Nalaab, go to your team and enter this code. If you already have the app, the button below opens it on the right screen.",
    code: "Team code",
    copy: "Copy code",
    copied: "Copied",
    openInApp: "Open in the Nalaab app",
    getOnPlay: "Get it on Google Play",
    getOnAppStore: "Download on the App Store",
  },
  ar: {
    title: "تمت دعوتك إلى فريق",
    body: "افتح نلعب، ادخل إلى فريقك وأدخل هذا الرمز. إن كان التطبيق لديك، الزر أدناه يفتحه على الشاشة الصحيحة.",
    code: "رمز الفريق",
    copy: "نسخ الرمز",
    copied: "تم النسخ",
    openInApp: "افتح في تطبيق نلعب",
    getOnPlay: "حمّله من Google Play",
    getOnAppStore: "حمّله من App Store",
  },
};

export default function TeamClient({ code }: { code: string }) {
  const [locale, setLocale] = useState<"en" | "ar">("en");
  const [platform, setPlatform] = useState<"android" | "ios" | "other">("other");
  const [copied, setCopied] = useState(false);
  const t = MESSAGES[locale];

  useEffect(() => {
    if (typeof navigator === "undefined") return;
    if (navigator.language?.startsWith("ar")) setLocale("ar");
    const ua = navigator.userAgent;
    if (/android/i.test(ua)) setPlatform("android");
    else if (/iPhone|iPad|iPod/i.test(ua)) setPlatform("ios");
  }, []);

  const deepLink = `ligatech://team/${code}`;

  return (
    <div dir={locale === "ar" ? "rtl" : "ltr"} className="min-h-screen py-10 px-4">
      <button
        onClick={() => setLocale(locale === "en" ? "ar" : "en")}
        className="fixed top-4 end-4 z-10 text-xs px-3 py-1.5 rounded-md border transition-colors"
        style={{ borderColor: "var(--border2)", color: "var(--muted)", background: "var(--surface)" }}
      >
        {locale === "en" ? "العربية" : "English"}
      </button>

      <div className="max-w-lg mx-auto text-center mt-16">
        <p className="text-2xl font-semibold mb-2" style={{ color: "var(--text)" }}>{t.title}</p>
        <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>{t.body}</p>

        <div className="rounded-2xl border py-6 mb-6" style={{ borderColor: "var(--border2)", background: "var(--surface)" }}>
          <p className="text-xs mb-1" style={{ color: "var(--muted)" }}>{t.code}</p>
          <p className="text-4xl font-bold tracking-widest" style={{ color: "#21c25e" }}>{code}</p>
          <button
            onClick={() => { navigator.clipboard?.writeText(code); setCopied(true); }}
            className="mt-4 text-sm px-4 py-2 rounded-lg border"
            style={{ borderColor: "var(--border2)", color: "var(--muted)", background: "var(--surface2)" }}
          >
            {copied ? t.copied : t.copy}
          </button>
        </div>

        <a
          href={deepLink}
          className="w-full flex items-center justify-center gap-2 py-2.5 mb-2 text-sm font-medium rounded-lg border transition-colors"
          style={{ borderColor: "var(--border2)", color: "var(--muted)", background: "var(--surface)" }}
        >
          📱 {t.openInApp}
        </a>
        <div className="space-y-2">
          {platform !== "ios" && (
            <a href={PLAY_STORE_URL} className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg"
               style={{ background: "var(--surface2)", color: "#21c25e", border: "1px solid var(--border2)" }}>
              ▶ {t.getOnPlay}
            </a>
          )}
          {platform !== "android" && APP_STORE_URL && (
            <a href={APP_STORE_URL} className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg"
               style={{ background: "var(--surface2)", color: "#21c25e", border: "1px solid var(--border2)" }}>
               {t.getOnAppStore}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
