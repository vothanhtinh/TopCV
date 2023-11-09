import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Mutex } from 'async-mutex';
import { store } from '@/store/configStore';
import {
  setLogoutAction,
  setRefreshTokenAction,
} from '@/store/slices/userSlice';
import { message } from 'antd';
import { callLogoutUser } from './auth.api';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api/v1',
  withCredentials: true,
});

const mutex = new Mutex();
const NO_RETRY_HEADER = 'x-no-retry';

const handleRefreshToken = async (): Promise<string> => {
  return await mutex.runExclusive(async () => {
    const res = await axiosInstance.get<any>('/auth/refresh');
    if (res && res.data) return res.data.access_token;
    else return null;
  });
};
axiosInstance.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('access_token');

  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response: any) => response.data,
  async (error: any) => {
    if (
      error.config &&
      error.response &&
      +error.response.status === 401 &&
      error.config.url !== '/auth/login' &&
      !error.config.headers[NO_RETRY_HEADER]
    ) {
      const access_token = await handleRefreshToken();
      error.config.headers[NO_RETRY_HEADER] = 'true';
      if (access_token) {
        error.config.headers['Authorization'] = `Bearer ${access_token}`;
        localStorage.setItem('access_token', access_token);
        return axiosInstance.request(error.config);
      } else {
        message.warning('Hết phiên đăng nhập. Vui lòng đăng nhập lại !!!');
        callLogoutUser();
        store.dispatch(setLogoutAction(''));
      }
    }

    if (
      error.config &&
      error.response &&
      +error.response.status === 400 &&
      error.config.url === '/auth/refresh'
    ) {
      const message =
        error?.response?.data?.message ?? 'Có lỗi xảy ra, vui lòng login.';

      store.dispatch(setRefreshTokenAction({ status: true, message }));
      store.dispatch(setLogoutAction(''));
    }

    return error?.response?.data ?? Promise.reject(error);
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
