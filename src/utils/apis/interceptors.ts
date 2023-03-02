import { InternalAxiosRequestConfig } from 'axios';

import { axiosAuthApi } from './axios';

// Request
const checkToken = (request: InternalAxiosRequestConfig) => {
  // TODO: accessToken 만료됐을 경우, refreshToken으로 유효한 token 발급받아 request에 설정하기
  return request;
};

const onReject = () => {
  throw new Error('로그인 된 유저 API 통신 중 에러발생');
};

axiosAuthApi.interceptors.request.use(checkToken, onReject);
