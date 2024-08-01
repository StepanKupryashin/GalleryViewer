import {API_KEY, API_URL} from '@env';
import axios, {InternalAxiosRequestConfig} from 'axios';

const http = axios.create({
  baseURL: API_URL, // http://localhost:8001
});

http.interceptors.request.use(function (config) {
  return {
    ...config,
    headers: {...config.headers, Authorization: `Client-ID ${API_KEY}`},
  } as InternalAxiosRequestConfig;
});

http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response?.status === 401) {
      throw new Error(error);
    }
    return Promise.reject(error);
  },
);

export default http;
