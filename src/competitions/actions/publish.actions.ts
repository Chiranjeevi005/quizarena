"use server";

import { CompetitionPublishService } from "../services/CompetitionPublishService";
import { prisma } from "@/lib/prisma";

const publishService = new CompetitionPublishService();

export async function publishCompetitionAction(slug: string) {
  try {
    const competition = await prisma.competition.findUnique({
      where: { slug },
      select: { id: true },
    });
    
    if (!competition) {
      return { success: false, error: "Competition not found by slug." };
    }

    const metadata = await publishService.publishCompetition(competition.id);
    return { success: true, data: metadata };
  } catch (error: any) {
    console.error("Failed to publish competition:", error);
    return { success: false, error: error.message };
  }
}
