export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean;
  public error?: string | Error;
  private _value?: T;

  protected constructor(isSuccess: boolean, error?: string | Error, value?: T) {
    if (isSuccess && error) {
      throw new Error("InvalidOperation: A result cannot be successful and contain an error");
    }
    if (!isSuccess && !error) {
      throw new Error("InvalidOperation: A failing result needs to contain an error message");
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this._value = value;
  }

  public getValue(): T {
    if (!this.isSuccess) {
      throw new Error("Can't get the value of an error result. Use 'error' instead.");
    }
    return this._value as T;
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, undefined, value);
  }

  public static fail<U>(error: string | Error): Result<U> {
    return new Result<U>(false, error);
  }
}

export class Success<T> extends Result<T> {
  private constructor(value: T) {
    super(true, undefined, value);
  }
}

export class Failure<T> extends Result<T> {
  private constructor(error: string | Error) {
    super(false, error);
  }
}
