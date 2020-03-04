export interface HttpExceptionResponse {
  data: null;
  path: string;
  method: string;
  message: string;
  timestamp: string;
  statusCode: number;
}

export interface HttpResultResponse {
  data: any;
  message: string;
  statusCode: number;
}
