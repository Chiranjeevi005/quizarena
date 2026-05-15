import { type DefaultSession } from "next-auth";

export type ExamCategory = "SSC" | "BANKING" | "RAILWAYS" | "STATE_PSC";
export type PreparationLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: string;
      onboardingCompleted?: boolean;
      examCategory?: ExamCategory | null;
      preparationLevel?: PreparationLevel | null;
      username?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
    onboardingCompleted?: boolean;
    examCategory?: ExamCategory | null;
    preparationLevel?: PreparationLevel | null;
    username?: string | null;
  }

  interface JWT {
    id?: string;
    role?: string;
    onboardingCompleted?: boolean;
    examCategory?: ExamCategory | null;
    preparationLevel?: PreparationLevel | null;
    username?: string | null;
  }
}
