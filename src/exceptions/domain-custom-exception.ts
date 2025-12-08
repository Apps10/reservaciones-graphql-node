
export class DomainError extends Error {
  statusCode: number;
  messageError: string;

  constructor(name: string, message: string, statusCode: number) {
    super(name);
    this.messageError = message;
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, new.target.prototype); 
    Error.captureStackTrace(this, this.constructor);
  }
}


export const DomainCustomException = (
  name: string,
  statusCode: number,
  defaultMessage = ""
) => {
  return class extends DomainError {
    constructor(message = defaultMessage) {
      super(name, message, statusCode);
    }
  };
};