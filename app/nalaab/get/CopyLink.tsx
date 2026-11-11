"use client";

import { useState } from "react";

// Inside Facebook or Instagram the TestFlight link cannot reach the TestFlight app: copying this page's
// address and pasting it into Safari is the way out when the browser has no "Open in Safari".
export default function CopyLink({ label, done }: { label: string; done: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="w-full rounded-lg px-4 py-3 font-semibold"
      style={{ border: "1px solid var(--border2)" }}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(window.location.href);
          setCopied(true);
        } catch {
          window.prompt("", window.location.href);
        }
      }}
    >
      {copied ? done : label}
    </button>
  );
}
