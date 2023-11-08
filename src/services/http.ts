import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api/v1',
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config: any) => {
  return config;
});

axiosInstance.interceptors.response.use(
  (response: any) => response.data,
  async (error: any) => {
    return error.response.data;
  },
);

export const get = <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return axiosInstance.get<T>(url, config);
};

export const post = <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return axiosInstance.post<T>(url, data, config);
};

export const put = <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return axiosInstance.put<T>(url, data, config);
};

export const remove = <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return axiosInstance.delete<T>(url, config);
};
