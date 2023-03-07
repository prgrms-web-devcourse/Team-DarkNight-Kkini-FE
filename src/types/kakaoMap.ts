export type KakaoMapOptions = {
  center: {
    lat: number;
    lng: number;
  };
  level: number;
};

export type RandomRestaurantType = {
  placeId: number;
  placeName: string;
  categories: string[];
  roadAddressName: string;
  kakaoPlaceUrl: string;
  phoneNumber: string;
  distance: number;
  latitude: number;
  longitude: number;
  customOverlay?: kakao.maps.CustomOverlay | null;
};
