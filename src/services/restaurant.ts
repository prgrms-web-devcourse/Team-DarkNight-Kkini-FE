import { axiosAuthApi } from 'apis/axios';

type Restaurant = {
  id: number;
  longitude: number;
  latitude: number;
  placeId: string;
  placeName: string;
  category: string;
  roadAddressName: string;
  photoUrls: string;
  kakaoPlaceUrl: string;
  phoneNumber?: string;
};

export const fetchRestaurant = async (storeId: number) => {
  const { data } = await axiosAuthApi<Restaurant>(`/api/v1/stores/${storeId}`);

  // return data;
  return DUMMY_RESTAURANT;
};

const DUMMY_RESTAURANT = {
  id: 1,
  longitude: 127.030230066229,
  latitude: 37.4973929132991,
  placeId: 12385890,
  placeName: '뽕족 강남역본점',
  category: '음식점 > 한식 > 육류,고기 > 족발,보쌈',
  roadAddressName: '서울 강남구 테헤란로4길 15',
  kakaoPlaceUrl: 'http://place.map.kakao.com/855757075',
  phoneNumber: '02-556-9279',
};
