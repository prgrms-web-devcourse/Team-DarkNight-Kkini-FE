import { atom } from 'recoil';
import { RestaurantProps } from 'types/restaurant';

export const searchRestaurantListState = atom<RestaurantProps[]>({
  key: 'searchRestaurantList',
  default: [],
});
