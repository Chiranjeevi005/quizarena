import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST() {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { role: null, authenticated: false },
        { status: 401 }
      );
    }

    return NextResponse.json({
      role: session.user.role || "USER",
      authenticated: true,
    });
  } catch (error) {
    console.error("Role check error:", error);
    return NextResponse.json(
      { role: null, authenticated: false },
      { status: 500 }
    );
  }
}