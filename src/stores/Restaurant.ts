import { atom } from 'recoil';
import { RestaurantProps } from 'types/Restaurant';

export const searchRestaurantListState = atom<RestaurantProps[]>({
  key: 'searchRestaurantList',
  default: [],
});
