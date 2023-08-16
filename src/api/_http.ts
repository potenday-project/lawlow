/* eslint-disable @typescript-eslint/no-explicit-any */
import Axios, { AxiosRequestConfig } from "axios";

export interface LawLowResponse<T = unknown> {
  success: boolean;
  data?: T;
  statusCode?: number;
  errorMessage?: string[];
  errorDetail?: string[];
}

class Http {
  readonly axios;

  constructor() {
    this.axios = Axios.create({
      baseURL: `${process.env.REACT_APP_SERVER_URL}`,
    });
  }

  async get<Response = unknown>(url: string, conf: AxiosRequestConfig = {}) {
    return this.axios
      .get<LawLowResponse<Response>>(url, { ...conf })
      .then((res) => res.data.data);
  }

  async authGet<Response = unknown>(
    url: string,
    conf: AxiosRequestConfig = {},
  ) {
    return this.axios
      .get<LawLowResponse<Response>>(url, {
        ...conf,
        headers: {
          ...conf.headers,
          "User-Id": localStorage.getItem("credential"),
        },
      })
      .then((res) => res.data.data);
  }

  async post<Request = any, Response = unknown>(
    url: string,
    data?: Request,
    conf: AxiosRequestConfig = {},
  ) {
    return this.axios
      .post<LawLowResponse<Response>>(url, data, {
        ...conf,
      })
      .then((res) => res.data.data);
  }

  async put<Request = any, Response = unknown>(url: string, data?: Request) {
    return this.axios
      .put<LawLowResponse<Response>>(url, data)
      .then((res) => res.data.data);
  }

  async authPut<Request = any, Response = unknown>(
    url: string,
    data?: Request,
    conf: AxiosRequestConfig = {},
  ) {
    return this.axios
      .put<LawLowResponse<Response>>(url, data, {
        ...conf,
        headers: {
          ...conf.headers,
          "User-Id": localStorage.getItem("credential"),
        },
      })
      .then((res) => res.data.data);
  }
}

export const http = new Http();
