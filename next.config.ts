import type { NextConfig } from "next";

// The LigaTech backend. The /join page calls it through this same-origin
// rewrite so the browser never needs CORS on the API.
const LIGATECH_API = "https://ligatech-api.mohammadalhussain.com";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${LIGATECH_API}/api/v1/:path*`,
      },
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
