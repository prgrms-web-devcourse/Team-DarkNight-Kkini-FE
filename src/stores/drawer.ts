import { atom } from 'recoil';

export const isDrawerOpenedState = atom<boolean>({
  key: 'isDrawerOpened',
  default: false,
});
