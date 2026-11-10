import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// The one link the app shares: whoever sends it, the phone that opens it decides the store. It is
// decided here on the server, so a link preview (no phone in its user agent) still gets this page.
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.alhussain.ligatech";
// TestFlight until the App Store listing is live, then https://apps.apple.com/app/id<APPLE_ID>
const APP_STORE_URL = "https://testflight.apple.com/join/dUZRuArD";

export const metadata: Metadata = {
  title: "نلعب | Nalaab",
  description: "اعثر على مباريات كرة قدم قريبة منك، اطلب لاعبين وتابع الدوريات. Find football games near you.",
  openGraph: {
    title: "نلعب | Nalaab",
    description: "اعثر على مباريات كرة قدم قريبة منك، اطلب لاعبين وتابع الدوريات. Find football games near you.",
  },
};

const MESSAGES = {
  ar: {
    title: "نلعب",
    body: "اعثر على مباريات كرة قدم قريبة منك، اطلب لاعبين لمباراتك وتابع الدوريات.",
    play: "حمّله من Google Play",
    appStore: "حمّله على iPhone (TestFlight)",
    iphoneSoon: "نلعب قادم قريباً إلى iPhone.",
  },
  en: {
    title: "Nalaab",
    body: "Find football games near you, get players for yours and follow the leagues.",
    play: "Get it on Google Play",
    appStore: "Get it on iPhone (TestFlight)",
    iphoneSoon: "Nalaab is coming to iPhone soon.",
  },
};

export default async function GetNalaabPage() {
  const request = await headers();
  const agent = request.get("user-agent") ?? "";
  const iphone = /iPhone|iPad|iPod/i.test(agent);
  if (/android/i.test(agent)) redirect(PLAY_STORE_URL);
  if (iphone && APP_STORE_URL) redirect(APP_STORE_URL);

  const locale = request.get("accept-language")?.toLowerCase().startsWith("en") ? "en" : "ar";
  const t = MESSAGES[locale];
  const button = { background: "#21C25E", color: "#0D1B14" };

  return (
    <main dir={locale === "ar" ? "rtl" : "ltr"} className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm text-center rounded-2xl p-8" style={{ background: "var(--surface)", border: "1px solid var(--border2)" }}>
        <h1 className="text-3xl font-bold mb-3">{t.title}</h1>
        <p className="mb-6" style={{ color: "var(--muted)" }}>{t.body}</p>
        {iphone ? (
          <p className="font-semibold">{t.iphoneSoon}</p>
        ) : (
          <div className="flex flex-col gap-3">
            <a href={PLAY_STORE_URL} className="rounded-lg px-4 py-3 font-semibold" style={button}>{t.play}</a>
            {APP_STORE_URL ? <a href={APP_STORE_URL} className="rounded-lg px-4 py-3 font-semibold" style={button}>{t.appStore}</a> : <p style={{ color: "var(--muted)" }}>{t.iphoneSoon}</p>}
          </div>
        )}
      </div>
    </main>
  );
}
