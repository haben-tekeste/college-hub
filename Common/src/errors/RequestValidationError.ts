import { ValidationError } from "express-validator";
import  CustomError  from "./CustomError";

export class RequestValidationError extends CustomError {
  public statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super();

    // because we are extending to built-in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  serializeErrors() {
    return this.errors.map((error) => {
      return {
        message: error.msg,
        field: error.param,
      };
    });
  }
}