import type { Metadata } from "next";
import RequestClient from "./RequestClient";

export const metadata: Metadata = {
  title: "Nalaab — A game needs players",
  description: "A game near you needs players. Open Nalaab to see it and join.",
  robots: { index: false, follow: false },
};

export default async function RequestPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <RequestClient id={id} />;
}
