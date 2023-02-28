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
  // x, y 추가
  // 구글 place_id
  marker?: kakao.maps.Marker | null;
};
