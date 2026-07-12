import { NextRequest, NextResponse } from "next/server";
import { RequestContext } from "../context/RequestContext";
import { ApiResponseBuilder } from "../responses/ApiResponse";
import { BaseError } from "../errors";
import { z } from "zod";

export abstract class BaseController {
  /**
   * Generates a RequestContext from the incoming NextRequest.
   * This handles IP extraction, user agent, locale, and requestId generation.
   */
  protected static createContext(
    req: NextRequest,
    userId?: string,
    organizationId?: string
  ): RequestContext {
    return new RequestContext({
      userId,
      organizationId,
      requestId: crypto.randomUUID(), // Assuming Node 19+ / Edge runtime support
      ip: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || undefined,
      userAgent: req.headers.get("user-agent") || undefined,
      locale: req.headers.get("accept-language")?.split(",")[0] || "en",
    });
  }

  /**
   * Wraps controller execution in a standardized try-catch block to format Responses/Errors consistently.
   */
  protected static async handleRequest<T>(
    operation: () => Promise<T>,
    successStatus: number = 200
  ): Promise<NextResponse> {
    try {
      const data = await operation();
      return NextResponse.json(ApiResponseBuilder.success(data), { status: successStatus });
    } catch (error: any) {
      if (error instanceof BaseError) {
        return NextResponse.json(
          ApiResponseBuilder.error(error.code, error.message, error.details),
          { status: error.statusCode }
        );
      }
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          ApiResponseBuilder.error("VALIDATION_ERROR", "Validation failed", error.format()),
          { status: 400 }
        );
      }

      // Fallback
      return NextResponse.json(
        ApiResponseBuilder.error("INTERNAL_ERROR", "An unexpected error occurred"),
        { status: 500 }
      );
    }
  }
}
