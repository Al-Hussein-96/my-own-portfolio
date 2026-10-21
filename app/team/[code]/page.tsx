import type { Metadata } from "next";
import TeamClient from "./TeamClient";

export const metadata: Metadata = {
  title: "LigaTech — Join a team",
  description: "Your captain invited you. Open LigaTech and you are on the team.",
  robots: { index: false, follow: false },
};

export default async function TeamPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  return <TeamClient code={code.toUpperCase()} />;
}
