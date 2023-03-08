import { isAxiosError } from 'axios';
import { Token } from 'types/auth';

import { axiosApi, axiosAuthApi, setAccessToken } from './../apis/axios';

type SilentLoginError = {
  code: string;
  message: string;
};

export const silentLogin = async () => {
  try {
    const { data } = await axiosApi.post<Token>('api/v1/tokens');
    setAccessToken(data.accessToken);
    return data.accessToken;
  } catch (error) {
    if (isAxiosError<SilentLoginError>(error)) {
      switch (error.response?.data.code) {
        case 'A004':
          return false;
        default:
          return false;
      }
    }
  }
};

export const logout = async () => {
  return await axiosAuthApi.delete('api/v1/tokens');
};
