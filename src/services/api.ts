import axios, {AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import { getToken } from '@/services/tokens';
import { AUTH_HEADER, BACKEND_URL, REQUEST_TIMEOUT } from '@/const';

type ErrorMessage = {
  type: string;
  message: string;
  details: {
    property: string;
    value: string;
    messages: string[];
  }[];
}

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers[AUTH_HEADER] = token;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError<ErrorMessage>) => {
      const parsedError: AxiosResponse<ErrorMessage, unknown> = error.response!;
      parsedError.data.details.forEach((detail) => {
        detail.messages.forEach((message) => console.debug(message)); // eslint-disable-line
      });

      throw error;
    }
  );

  return api;
};
