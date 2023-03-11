import { axiosApi, removeAccessToken, setAccessToken } from 'apis/axios';
import { isAxiosError } from 'axios';
import { Token } from 'types/auth';
import { ERROR_CODE } from 'utils/constants/errorCode';

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
        case ERROR_CODE.INVALID_REFRESH_TOKEN:
          return false;
        default:
          return false;
      }
    }
  }
};

export const logout = async () => {
  try {
    const { status } = await axiosApi.delete('api/v1/tokens');
    if (status === 204) {
      removeAccessToken();
      return true;
    }
  } catch (error) {
    return false;
  }
};
