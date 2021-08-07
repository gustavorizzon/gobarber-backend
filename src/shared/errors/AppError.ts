export default class AppError {
  public message: string;

  public statusCode: number;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }

  public getMessage(): string {
    return this.message;
  }

  public getStatusCode(): number {
    return this.statusCode;
  }
}
