import {CustomError} from "./customError";

export class NotFoundError extends CustomError {
  statusCode: number = 404;
  constructor() {
    super("Route not found");

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors(): {message: string; field?: string}[] {
    return [{message: "Not Found"}];
  }
}
