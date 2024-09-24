import { AxiosRequestConfig, AxiosResponse } from "axios";

export type RequestConfig = AxiosRequestConfig;
export type Response<T> = AxiosResponse<T>;
export type RequestParams = Record<string, any>;
