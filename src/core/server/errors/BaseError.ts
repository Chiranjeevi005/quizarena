export class BaseError extends Error {
  public statusCode: number;
  public details?: any;
  public code: string;

  constructor(
    message: string,
    statusCode: number = 500,
    code: string = "INTERNAL_ERROR",
    details?: any
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends BaseError {
  constructor(message: string = "Validation failed", details?: any) {
    super(message, 400, "VALIDATION_ERROR", details);
  }
}

export class NotFoundError extends BaseError {
  constructor(message: string = "Resource not found", details?: any) {
    super(message, 404, "NOT_FOUND", details);
  }
}

export class ConflictError extends BaseError {
  constructor(message: string = "Resource conflict", details?: any) {
    super(message, 409, "CONFLICT", details);
  }
}

export class AuthorizationError extends BaseError {
  constructor(message: string = "Unauthorized access", details?: any) {
    super(message, 403, "UNAUTHORIZED", details);
  }
}

export class AuthenticationError extends BaseError {
  constructor(message: string = "Unauthenticated", details?: any) {
    super(message, 401, "UNAUTHENTICATED", details);
  }
}

export class BusinessRuleError extends BaseError {
  constructor(message: string = "Business rule violation", details?: any) {
    super(message, 422, "BUSINESS_RULE_VIOLATION", details);
  }
}

export class InternalServerError extends BaseError {
  constructor(message: string = "Internal server error", details?: any) {
    super(message, 500, "INTERNAL_ERROR", details);
  }
}
