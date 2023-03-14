import { atom } from 'recoil';

export const foodPartyCreateDrawerOpenState = atom<boolean>({
  key: 'foodPartyCreateDrawerOpen',
  default: false,
});

export const loginDrawerOpenState = atom<boolean>({
  key: 'loginDrawerOpen',
  default: false,
});

export const restaurantDrawerOpenState = atom<boolean>({
  key: 'restaurantOpen',
  default: false,
});

export const randomRestaurantDrawerOpenState = atom<boolean>({
  key: 'randomRestaurantOpen',
  default: false,
});

export const isIniState = atom<boolean>({
  key: 'isInit',
  default: true,
});
