import { atom } from 'recoil';
import { RestaurantFromKeywordSearchProps } from 'types/kakaoSearch';

export const searchRestaurantListState = atom<RestaurantFromKeywordSearchProps[]>({
  key: 'searchRestaurantList',
  default: [],
});

export const selectedRestaurantState = atom<RestaurantFromKeywordSearchProps>({
  key: 'selectedRestaurant',
  default: {
    placeName: '',
    categories: [],
    roadAddressName: '',
    photoUrls: [],
    kakaoPlaceUrl: '',
    phoneNumber: '',
    x: 0,
    y: 0,
  },
});
