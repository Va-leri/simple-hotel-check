import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { LOGIN_BASE_URL } from '../const';
import { getToken } from './token';

const REQUEST_TIMEOUT = 5000; //ms

enum HttpCode {
  Unauthorized = 401,
}

type UnauthorizedCallback = () => void;

export const createLoginApi = (onUnauthorized: UnauthorizedCallback): AxiosInstance => {
  const api = axios.create({
    baseURL: LOGIN_BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => response,

    (error: AxiosError) => {
      const {response} = error;

      if (response?.status === HttpCode.Unauthorized) {
        onUnauthorized();
      }

      return Promise.reject(error);
    });

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = getToken();

    if (token) {
      config.headers['X-Token'] = token;
    }

    return config;
  });

  return api;
};
