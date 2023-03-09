export type Restaurant = {
  id?: number;
  placeId: number;
  placeName: string;
  categories: string;
  roadAddressName: string;
  kakaoPlaceUrl: string;
  phoneNumber: string;
  distance?: number;
  latitude: number;
  longitude: number;
  photoUrls?: string;
  customOverlay?: kakao.maps.CustomOverlay | null;
};
