import { isAxiosError } from 'axios';
import { Token } from 'types/auth';

import { axiosApi, setAccessToken } from './../apis/axios';

type SilentLoginError = {
  code: string;
  message: string;
};

export const silentLogin = async () => {
  try {
    const { data } = await axiosApi.post<Token>('api/v1/tokens');
    setAccessToken(data.accessToken);
    return true;
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
