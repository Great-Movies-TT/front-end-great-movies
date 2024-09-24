import { RequestConfig, RequestParams, Response } from "@/types";

export interface HttpServiceInterface {
  get<T>(
    path: string,
    params?: RequestParams,
    config?: RequestConfig
  ): Promise<Response<T>>;
  post<T>(
    path: string,
    data?: any,
    config?: RequestConfig
  ): Promise<Response<T>>;
  put<T>(
    path: string,
    data?: any,
    config?: RequestConfig
  ): Promise<Response<T>>;
  delete<T>(path: string, config?: RequestConfig): Promise<Response<T>>;
}
