export type KakaoMapOptions = {
  center: {
    lat: number;
    lng: number;
  };
  level: number;
};

export type RandomRestaurantType = {
  placeName?: string;
  categories?: string[];
  roadAddressName?: string;
  rating?: number;
  photoUrls?: string[];
  isOpen?: boolean;
  kakaoPlaceUrl?: string;
  phoneNumber?: string;
  marker?: kakao.maps.Marker | null;
};
