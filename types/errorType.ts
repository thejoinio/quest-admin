export interface TError {
  response: TErrorResponse;
  message?: string;
}
interface TErrorResponse {
  success: boolean;
  error: string;
  data?: {
    message?: string;
  }
}