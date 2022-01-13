import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { HOTELS_BASE_URL} from '../const';

const REQUEST_TIMEOUT = 5000; //ms

/* enum HttpCode {
  Unauthorized = 401,
} */

export const createHotelsApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: HOTELS_BASE_URL,
    timeout: REQUEST_TIMEOUT,
    params: {
      currency: 'rub',
      lang: 'ru',
      limit: 10,
    },
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => response,

    (error: AxiosError) => Promise.reject(error),
  );

  return api;
};
