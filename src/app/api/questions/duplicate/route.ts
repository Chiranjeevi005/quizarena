import { NextRequest, NextResponse } from "next/server";
import { BaseController } from "@/core/server/controllers/BaseController";
import { QuestionAuthoringService } from "@/features/questions/server/authoring/QuestionAuthoringService";
import { QuestionRepository } from "@/features/questions/server/repositories/QuestionRepository";
import { QuestionRevisionRepository } from "@/features/questions/server/repositories/QuestionRevisionRepository";
import { TransactionManager } from "@/core/server/transactions/TransactionManager";
import { IEventBus } from "@/core/server/events/DomainEvent";
import { prisma } from "@/lib/prisma";

const txManager = new TransactionManager(prisma);
const repo = new QuestionRepository(prisma);
const revRepo = new QuestionRevisionRepository(prisma);
const service = new QuestionAuthoringService(txManager, repo, revRepo, undefined);

class DuplicateController extends BaseController {
  public static async post(req: NextRequest) {
    return this.handleRequest(async () => {
      const { originalQuestionId, userId } = await req.json();
      const result = await service.duplicateQuestion(originalQuestionId, userId);
      return result.getValue();
    });
  }
}

export const POST = (req: NextRequest) => DuplicateController.post(req);
