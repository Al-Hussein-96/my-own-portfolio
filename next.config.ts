import type { NextConfig } from "next";

// The LigaTech backend is reached through app/api/v1/[...path]/route.ts, not
// a rewrite: a rewrite forwards the browser's Origin header and the backend's
// CORS filter answers it with 403. The route handler strips it.

const nextConfig: NextConfig = {
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
