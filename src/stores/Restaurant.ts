import { atom } from 'recoil';
import { RestaurantFromKeywordSearchProps } from 'types/kakaoSearch';

export const searchRestaurantListState = atom<RestaurantFromKeywordSearchProps[]>({
  key: 'searchRestaurantList',
  default: [],
});
