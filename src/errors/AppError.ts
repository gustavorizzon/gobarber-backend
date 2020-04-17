export default class AppError {
  private message: string;

  private statusCode: number;

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
