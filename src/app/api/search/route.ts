import { NextResponse } from "next/server";
import { globalSearchService } from "../../../platform/services/GlobalSearchService";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q) {
    return NextResponse.json([]);
  }

  try {
    const results = await globalSearchService.search(q);
    return NextResponse.json(results);
  } catch (error) {
    console.error("[Search API] Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
