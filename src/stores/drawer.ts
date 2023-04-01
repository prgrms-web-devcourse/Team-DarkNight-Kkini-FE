import { atom } from 'recoil';
import { RedirectUrlType } from 'types/auth';
import ROUTING_PATHS from 'utils/constants/routingPaths';

export const foodPartyCreateDrawerOpenState = atom<boolean>({
  key: 'foodPartyCreateDrawerOpen',
  default: false,
});

export const loginDrawerState = atom<{ isOpen: boolean } & RedirectUrlType>({
  key: 'loginDrawerOpen',
  default: { isOpen: false, urlAfterLogin: ROUTING_PATHS.HOME },
});

export const restaurantDrawerOpenState = atom<boolean>({
  key: 'restaurantOpen',
  default: false,
});

export const randomRestaurantDrawerOpenState = atom<boolean>({
  key: 'randomRestaurantOpen',
  default: false,
});

export const foodPartyCreateDrawerInitState = atom<boolean>({
  key: 'foodPartyCreateDrawerIsInit',
  default: true,
});
