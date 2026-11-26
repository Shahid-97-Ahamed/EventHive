export interface ErrorItem {
  field: string;
  message: string;
}

export class AppError extends Error {
  public statusCode: number;
  public errors:ErrorItem[] | undefined

  constructor(statusCode: number, message: string, errors?: ErrorItem[]) {
    super(message);
    this.statusCode = statusCode;
    this.errors=errors
  }
}