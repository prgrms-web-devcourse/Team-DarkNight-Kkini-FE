import { atom } from 'recoil';

export const isDrawerOpenedState = atom<boolean>({
  key: 'isDrawerOpened',
  default: false,
});

export const loginDrawerOpenState = atom<boolean>({
  key: 'loginDrawerOpen',
  default: false,
});
