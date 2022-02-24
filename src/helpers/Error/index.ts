type APIErrorProps = {
  code: number;
  message: string;
}

export class APIError extends Error {
  public code: number;

  public message: string;

  constructor({
    code,
    message,
  }: APIErrorProps) {
    super(message);

    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);

    this.message = message;
    this.code = code;
  }
}
