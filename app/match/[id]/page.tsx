import type { Metadata } from "next";
import MatchClient from "./MatchClient";

export const metadata: Metadata = {
  title: "LigaTech — A game for your team",
  description: "Your captain shared a game. Open LigaTech to see it and say if you are in.",
  robots: { index: false, follow: false },
};

export default async function MatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <MatchClient id={id} />;
}
