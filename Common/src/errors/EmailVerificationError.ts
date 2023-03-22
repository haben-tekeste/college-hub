import CustomError from "./CustomError";

export class EmailVerificationError extends CustomError {
  statusCode = 401;
  constructor() {
    super();

    Object.setPrototypeOf(this, EmailVerificationError.prototype);
  }
  serializeErrors() {
    return [{ message: "Please verify your email" }];
  }
}
