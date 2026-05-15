import { NextRequest, NextResponse } from "next/server";
import { validateApiRequest } from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";
import { normalizeUsername, validateUsername } from "@/lib/onboarding";

export async function GET(request: NextRequest) {
  try {
    const user = await validateApiRequest(request);
    if (user instanceof Response) return user;

    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    const normalized = normalizeUsername(username);
    const validation = validateUsername(normalized);

    if (!validation.valid) {
      return NextResponse.json({ available: false, error: validation.error }, { status: 200 });
    }

    const existing = await prisma.user.findFirst({
      where: { username: normalized, NOT: { id: user.id } },
    });

    return NextResponse.json({ available: !existing }, { status: 200 });
  } catch (error) {
    console.error("Username check error:", error);
    return NextResponse.json({ error: "Failed to check username" }, { status: 500 });
  }
}
