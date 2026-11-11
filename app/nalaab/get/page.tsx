import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import CopyLink from "./CopyLink";

// The one link the app shares: whoever sends it, the phone that opens it decides the store. It is
// decided here on the server, so a link preview (no phone in its user agent) still gets this page.
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.alhussain.ligatech";
// TestFlight until the App Store listing is live, then https://apps.apple.com/app/id<APPLE_ID>
const APP_STORE_URL = "https://testflight.apple.com/join/dUZRuArD";
const TESTFLIGHT_APP_URL = "https://apps.apple.com/app/testflight/id899247664";
// The in-app browsers of Facebook, Messenger, Instagram and others: they cannot hand a link to TestFlight.
const IN_APP = /FBAN|FBAV|FB_IAB|Instagram|Messenger|Line\/|Snapchat|TikTok|musical_ly/i;

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
    steps: "على iPhone، بثلاث خطوات:",
    step1: "ثبّت تطبيق TestFlight من App Store.",
    step1Link: "TestFlight على App Store",
    step2: "ارجع إلى هذه الصفحة في Safari واضغط «حمّل نلعب عبر TestFlight».",
    step3: "في TestFlight اضغط «قبول» ثم «تثبيت».",
    noCode: "لا تحتاج أي رمز دعوة. إذا طلب TestFlight رمزاً فأنت فتحته بدون الرابط: افتح الرابط من Safari.",
    join: "حمّل نلعب عبر TestFlight",
    inApp: "أنت داخل متصفح تطبيق آخر (فيسبوك أو إنستغرام)، ومنه لا يفتح TestFlight. اضغط ⋯ في الأعلى ثم «فتح في Safari»، أو انسخ الرابط والصقه في Safari.",
    copy: "انسخ الرابط",
    copied: "نُسخ الرابط. الصقه في Safari.",
  },
  en: {
    title: "Nalaab",
    body: "Find football games near you, get players for yours and follow the leagues.",
    play: "Get it on Google Play",
    appStore: "Get it on iPhone (TestFlight)",
    iphoneSoon: "Nalaab is coming to iPhone soon.",
    steps: "On iPhone, in three steps:",
    step1: "Install the TestFlight app from the App Store.",
    step1Link: "TestFlight on the App Store",
    step2: "Come back to this page in Safari and tap “Get Nalaab with TestFlight”.",
    step3: "In TestFlight, tap “Accept”, then “Install”.",
    noCode: "No invitation code is needed. If TestFlight asks for one, it was opened without the link: open the link from Safari.",
    join: "Get Nalaab with TestFlight",
    inApp: "You're inside another app's browser (Facebook or Instagram), which can't open TestFlight. Tap ⋯ at the top, then “Open in Safari”, or copy the link and paste it into Safari.",
    copy: "Copy the link",
    copied: "Link copied. Paste it into Safari.",
  },
};

export default async function GetNalaabPage() {
  const request = await headers();
  const agent = request.get("user-agent") ?? "";
  const iphone = /iPhone|iPad|iPod/i.test(agent);
  if (/android/i.test(agent)) redirect(PLAY_STORE_URL);
  // An iPhone gets the steps, not a redirect: inside Facebook a redirect to TestFlight dead-ends, and
  // whoever opens TestFlight by hand meets a "Redeem" box asking for a code a public link does not have.
  const inApp = IN_APP.test(agent);

  const locale = request.get("accept-language")?.toLowerCase().startsWith("en") ? "en" : "ar";
  const t = MESSAGES[locale];
  const button = { background: "#21C25E", color: "#0D1B14" };

  return (
    <main dir={locale === "ar" ? "rtl" : "ltr"} className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm text-center rounded-2xl p-8" style={{ background: "var(--surface)", border: "1px solid var(--border2)" }}>
        <h1 className="text-3xl font-bold mb-3">{t.title}</h1>
        <p className="mb-6" style={{ color: "var(--muted)" }}>{t.body}</p>
        {iphone && !APP_STORE_URL ? (
          <p className="font-semibold">{t.iphoneSoon}</p>
        ) : iphone ? (
          <div className="flex flex-col gap-3" style={{ textAlign: locale === "ar" ? "right" : "left" }}>
            {inApp && (
              <>
                <p className="rounded-lg p-3 text-sm" style={{ background: "rgba(255,193,7,.12)", border: "1px solid rgba(255,193,7,.4)" }}>{t.inApp}</p>
                <CopyLink label={t.copy} done={t.copied} />
              </>
            )}
            <p className="font-semibold">{t.steps}</p>
            <ol className="flex flex-col gap-2 text-sm" style={{ listStyle: "decimal", paddingInlineStart: "1.25rem" }}>
              <li>{t.step1} <a href={TESTFLIGHT_APP_URL} className="underline">{t.step1Link}</a></li>
              <li>{t.step2}</li>
              <li>{t.step3}</li>
            </ol>
            <a href={APP_STORE_URL} className="rounded-lg px-4 py-3 font-semibold text-center" style={button}>{t.join}</a>
            <p className="text-xs" style={{ color: "var(--muted)" }}>{t.noCode}</p>
          </div>
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
