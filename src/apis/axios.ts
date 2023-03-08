import axios from 'axios';

export const axiosApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_END_POINT,
  withCredentials: true,
});

export const axiosAuthApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_END_POINT,
  withCredentials: true,
});

export const setAccessToken = (token: string) => {
  axiosAuthApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const removeAccessToken = () => {
  axiosAuthApi.defaults.headers.common['Authorization'] = '';
};
