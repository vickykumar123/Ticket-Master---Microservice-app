import {CustomError} from "./customError";

export class BadRequestError extends CustomError {
  statusCode: number = 400;

  constructor(public message: string) {
    super(message);
    this.message = message;

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors(): {message: string; field?: string}[] {
    return [{message: this.message}];
  }
}
