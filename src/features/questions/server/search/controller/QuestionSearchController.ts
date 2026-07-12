import { NextRequest, NextResponse } from "next/server";
import { BaseController } from "@/core/server/controllers/BaseController";
import { QuestionSearchService } from "../service/QuestionSearchService";
import { prisma } from "@/core/server/database/prisma";
import { QuestionSearchMode } from "../profiles/QuestionSearchMode";

export class QuestionSearchController extends BaseController {
  public static async executeGet(req: NextRequest): Promise<NextResponse> {
    const context = this.createContext(req, "test-user-id"); // In real app, extract from auth token
    const service = new QuestionSearchService(prisma);
    const searchParams = req.nextUrl.searchParams;

    // Parse query parameters manually for GET
    const q = searchParams.get("q") || undefined;
    const modeParam =
      (searchParams.get("mode") as QuestionSearchMode) || QuestionSearchMode.STANDARD;

    return this.handleRequest(async () => {
      const result = await service.search(
        context,
        {
          q,
          pagination: { page: 1, limit: 20 },
          filters: {},
        },
        modeParam
      );

      return result.getValue();
    });
  }

  public static async executePost(req: NextRequest): Promise<NextResponse> {
    const context = this.createContext(req, "test-user-id"); // In real app, extract from auth token
    const service = new QuestionSearchService(prisma);

    return this.handleRequest(async () => {
      const payload = await req.json();

      const result = await service.search(
        context,
        payload.query,
        payload.mode || QuestionSearchMode.STANDARD
      );

      return result.getValue();
    });
  }
}
