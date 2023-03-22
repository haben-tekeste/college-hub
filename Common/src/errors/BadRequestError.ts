import CustomError from "./CustomError";

export class BadRequestError extends CustomError {
  public statusCode = 400;

  constructor(public message: string) {
    super();

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }];
  }
}