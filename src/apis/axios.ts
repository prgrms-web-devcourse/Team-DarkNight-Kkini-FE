import axios, { AxiosError } from 'axios';
import { InternalAxiosRequestConfig } from 'axios';
import * as jwt from 'jsonwebtoken';
import { logout, silentLogin } from 'services/auth';
import ROUTING_PATHS from 'utils/constants/routingPaths';

export const axiosApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_END_POINT,
  withCredentials: true,
});

export const axiosAuthApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_END_POINT,
  withCredentials: true,
});

// auth request interceptor
const checkToken = async (request: InternalAxiosRequestConfig) => {
  const authorization = request.headers.Authorization;
  if (authorization) {
    const [type, accessToken] = (authorization as string).split(' ');
    if (!isExpiredAccessToken(accessToken)) return request;

    // 만료된 token이기에 토큰재발급 요청
    const token = await silentLogin();
    if (token) {
      request.headers.Authorization = `${type} ${token}`;
    } else {
      await logout();
      window.location.replace(ROUTING_PATHS.HOME);
    }
  }
  return request;
};

const onReject = (error: AxiosError) => {
  return Promise.reject(error);
};

axiosAuthApi.interceptors.request.use(checkToken, onReject);

// token
export const setAccessToken = (token: string) => {
  axiosAuthApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const removeAccessToken = () => {
  axiosAuthApi.defaults.headers.common['Authorization'] = '';
};

const isExpiredAccessToken = (accessToken: string) => {
  const { exp } = jwt.decode(accessToken) as { exp: number };
  const nowDate = new Date().getTime() / 1000;

  return exp < nowDate;
};
