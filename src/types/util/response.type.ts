interface BaseResponse<T> {
  data: T;
  status: string;
  message: string;
  statusCode: string;
}

export { BaseResponse };
