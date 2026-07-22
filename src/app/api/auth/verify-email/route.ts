import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const verifyEmailSchema = z.object({
  token: z.string().min(1, "Token is required"),
  email: z.string().email("Valid email is required"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, email } = verifyEmailSchema.parse(body);

    const normalizedEmail = email.toLowerCase().trim();

    // Find the token in the database
    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        identifier_token: {
          identifier: normalizedEmail,
          token,
        },
      },
    });

    if (!verificationToken) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    // Check if token is expired
    if (verificationToken.expires < new Date()) {
      return NextResponse.json({ error: "Token has expired" }, { status: 400 });
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.emailVerified) {
      return NextResponse.json({ message: "Email is already verified" }, { status: 200 });
    }

    // Update the user's emailVerified and delete the token
    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      }),
      prisma.verificationToken.delete({
        where: {
          identifier_token: {
            identifier: normalizedEmail,
            token,
          },
        },
      }),
    ]);

    return NextResponse.json({ message: "Email verified successfully" }, { status: 200 });
  } catch (error) {
    console.error("[VERIFY_EMAIL_ERROR]", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: (error as any).errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
