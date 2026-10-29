"use client";

import { useEffect, useState } from "react";

// A game a captain shared. Nothing to fetch: the app shows the game. If the app is
// installed the OS opens it before this page ever shows; this is the fallback for a
// phone without it, or a desktop.
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.alhussain.ligatech";
// Filled in when the iOS app is live: https://apps.apple.com/app/id<APPLE_ID>
const APP_STORE_URL = "";

const MESSAGES = {
  en: {
    title: "A game for your team",
    body: "Your captain shared a game on Nalaab. Open it in the app to see the time, the pitch and the other team.",
    openInApp: "Open in the Nalaab app",
    getOnPlay: "Get it on Google Play",
    getOnAppStore: "Download on the App Store",
  },
  ar: {
    title: "مباراة لفريقك",
    body: "شارك كابتنك مباراة على نلعب. افتحها في التطبيق لترى الوقت والملعب والفريق الآخر.",
    openInApp: "افتح في تطبيق نلعب",
    getOnPlay: "حمّله من Google Play",
    getOnAppStore: "حمّله من App Store",
  },
};

export default function MatchClient({ id }: { id: string }) {
  const [locale, setLocale] = useState<"en" | "ar">("en");
  const [platform, setPlatform] = useState<"android" | "ios" | "other">("other");
  const t = MESSAGES[locale];

  useEffect(() => {
    if (typeof navigator === "undefined") return;
    if (navigator.language?.startsWith("ar")) setLocale("ar");
    const ua = navigator.userAgent;
    if (/android/i.test(ua)) setPlatform("android");
    else if (/iPhone|iPad|iPod/i.test(ua)) setPlatform("ios");
  }, []);

  const deepLink = `ligatech://match/${id}`;

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

        <p className="text-6xl mb-8">⚽</p>

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
