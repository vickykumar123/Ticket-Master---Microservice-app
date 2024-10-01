import {CustomError} from "./customError";

export class NotAuthorizedError extends CustomError {
  statusCode: number = 401;

  constructor() {
    super();

    Object.setPrototypeOf(this, NotAuthorizedError);
  }

  serializeErrors(): {message: string; field?: string}[] {
    return [{message: "Unauthorized"}];
  }
}
