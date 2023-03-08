import { atom } from 'recoil';
import { RestaurantFromKeywordSearchProps } from 'types/kakaoSearch';

export const searchRestaurantListState = atom<RestaurantFromKeywordSearchProps[]>({
  key: 'searchRestaurantList',
  default: [],
});

export const selectedRestaurantState = atom<RestaurantFromKeywordSearchProps>({
  key: 'selectedRestaurant',
  default: {
    placeId: '',
    placeName: '',
    categories: '',
    roadAddressName: '',
    photoUrls: [],
    kakaoPlaceUrl: '',
    phoneNumber: '',
    longitude: 0,
    latitude: 0,
  },
});
