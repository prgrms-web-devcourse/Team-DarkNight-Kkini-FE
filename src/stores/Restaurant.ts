import { atom } from 'recoil';
import { RestaurantProps } from 'types/Restaurant';

export const searchRestaurantList = atom<RestaurantProps[]>({
  key: 'restaurants',
  default: [],
});
