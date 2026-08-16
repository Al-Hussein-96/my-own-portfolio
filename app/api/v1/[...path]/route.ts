import { NextRequest, NextResponse } from "next/server";

// The LigaTech backend, reached server-side so the browser stays same-origin.
const BACKEND = "https://ligatech-api.mohammadalhussain.com";

/**
 * Why a route handler and not a next.config rewrite: a rewrite forwards the
 * browser's headers untouched, and every browser POST carries an Origin
 * header — which the backend's CORS filter answers with 403 "Invalid CORS
 * request", since this site is not in its allowlist. Stripping origin,
 * referer and host makes the hop a plain server-to-server call, which is
 * what it is. (The ligatech-dashboard's proxy does the same, for the same
 * reason.)
 */
async function handler(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const url = `${BACKEND}/api/v1/${path.join("/")}${req.nextUrl.search}`;

  const headers = new Headers();
  req.headers.forEach((value, key) => {
    if (!["host", "origin", "referer"].includes(key)) headers.set(key, value);
  });

  const body =
    req.method !== "GET" && req.method !== "HEAD"
      ? await req.arrayBuffer()
      : undefined;

  const res = await fetch(url, { method: req.method, headers, body });

  const resHeaders = new Headers();
  res.headers.forEach((value, key) => {
    if (key !== "transfer-encoding" && key !== "content-encoding") {
      resHeaders.set(key, value);
    }
  });

  return new NextResponse(res.body, { status: res.status, headers: resHeaders });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
