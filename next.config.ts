import type { NextConfig } from "next";

// The LigaTech backend is reached through app/api/v1/[...path]/route.ts, not
// a rewrite: a rewrite forwards the browser's Origin header and the backend's
// CORS filter answers it with 403. The route handler strips it.

const nextConfig: NextConfig = {
  // Nalaab's store-facing policy pages: plain HTML in public/nalaab, the same files as the
  // mobile repo's docs/privacy-policy.html and docs/terms.html, served at clean URLs.
  async rewrites() {
    return [
      { source: "/nalaab/privacy", destination: "/nalaab/privacy.html" },
      { source: "/nalaab/terms", destination: "/nalaab/terms.html" },
    ];
  },
  async headers() {
    return [
      {
        // Apple requires exactly application/json on this extensionless file;
        // without this header it is served as octet-stream and iOS ignores it.
        source: "/.well-known/apple-app-site-association",
        headers: [{ key: "Content-Type", value: "application/json" }],
      },
    ];
  },
};

export default nextConfig;
