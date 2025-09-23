import { AxiosRequestConfig } from "axios";
import api from "./api";

export const get = async <T>(url: string, params?: object): Promise<T> => {
  const response = await api.get(url, { params });
  return response.data as T;
};

export const post = async <T>(url: string, data?: object): Promise<T> => {
  const response = await api.post(url, data);
  return response.data as T;
};

export const put = async <T>(
  url: string,
  data?: object,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await api.put(url, data, config);
  return response.data as T;
};

export const patch = async <T>(url: string, data?: object): Promise<T> => {
  const response = await api.patch(url, data);
  return response.data as T;
};

// export const del = async <T>(
//   url: string,
//   params?: object
// ): Promise<T | void> => {
//   const response = await api.delete(url, { params });
//   return response.data as T | void;
// };

export const del = async <T>(url: string, params?: object): Promise<T> => {
  const response = await api.delete(url, { params });
  return response.data as T;
};
