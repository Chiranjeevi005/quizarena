export interface ApiResponseMeta {
  [key: string]: any;
}

export interface ApiResponseError {
  code: string;
  message: string;
  details?: any;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  meta: ApiResponseMeta | null;
  errors: ApiResponseError | null;
}

export class ApiResponseBuilder {
  public static success<T>(data: T, meta?: ApiResponseMeta): ApiResponse<T> {
    return {
      success: true,
      data,
      meta: meta || null,
      errors: null,
    };
  }

  public static error(code: string, message: string, details?: any): ApiResponse<null> {
    return {
      success: false,
      data: null,
      meta: null,
      errors: { code, message, details },
    };
  }
}
