import axios from 'axios';

export const axiosApi = axios.create({
  baseURL: '',
});

export const axiosAuthApi = axios.create({
  baseURL: '',
  withCredentials: true,
});

export const setAccessToken = (token: string) => {
  axiosAuthApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
