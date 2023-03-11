import { atom } from 'recoil';

export const isLoginState = atom<boolean>({
  key: 'isLogin',
  default: false,
});

export const isCheckingRefreshTokenState = atom<boolean>({
  key: 'isCheckingRefreshToken',
  default: false,
});
