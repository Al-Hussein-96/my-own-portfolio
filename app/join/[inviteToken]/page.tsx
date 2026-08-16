import type { Metadata } from "next";
import JoinClient from "./JoinClient";

export const metadata: Metadata = {
  title: "LigaTech — Team Invite",
  description: "Add your squad to the team. No account needed.",
  // Every link carries a private token; none of them belongs in a search index.
  robots: { index: false, follow: false },
};

export default async function JoinPage({
  params,
}: {
  params: Promise<{ inviteToken: string }>;
}) {
  const { inviteToken } = await params;
  return <JoinClient inviteToken={inviteToken} />;
}
