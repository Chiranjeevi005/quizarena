import { NextResponse } from "next/server";

export async function GET() {
  // Version can be injected via env variables during CI/CD build phase
  const version = process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0-rc.1";
  const commit = process.env.NEXT_PUBLIC_COMMIT_SHA || "unknown";

  return NextResponse.json({
    version,
    commit,
    environment: process.env.NODE_ENV,
  });
}
