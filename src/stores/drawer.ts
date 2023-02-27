import { atom } from 'recoil';

export const isDrawerOpened = atom<boolean>({
  key: 'isDrawerOpened',
  default: false,
});
