import type { Metadata } from "next";
import RequestClient from "../../request/[id]/RequestClient";

// The short link to a shared "need players" post: /r/K7Q2MP. The app and the server open a post by
// its code as they do by its id, so this is the /request/[id] page under a shorter address.
export const metadata: Metadata = {
  title: "Nalaab — A game needs players",
  description: "A game near you needs players. Open Nalaab to see it and join.",
  robots: { index: false, follow: false },
};

export default async function ShortRequestPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  return <RequestClient id={code} />;
}
