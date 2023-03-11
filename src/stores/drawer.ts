import { atom } from 'recoil';

export const isDrawerOpenedState = atom<boolean>({
  key: 'isDrawerOpened',
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
