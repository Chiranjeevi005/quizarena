import { NextRequest } from "next/server";
import { QuestionSearchController } from "@/features/questions/server/search/controller/QuestionSearchController";

export async function GET(req: NextRequest) {
  return QuestionSearchController.executeGet(req);
}

export async function POST(req: NextRequest) {
  return QuestionSearchController.executePost(req);
}
