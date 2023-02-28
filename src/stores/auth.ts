import { atom } from 'recoil';

export const isLogin = atom<boolean>({
  key: 'isLogin',
  default: false,
});
