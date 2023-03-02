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
  kakaoPlaceUrl?: string;
  phoneNumber?: string;
  distance?: number;
  // To Do: 해당 속성 추가하기(setState 할 때에도 추가 필요) by 승준
  // x, y 추가
  // 구글 place_id
  customOverlay?: kakao.maps.CustomOverlay | null;
};
