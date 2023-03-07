type DocumentsType = {
  collection: string;
  thumbnail_url: string;
  image_url: string;
  width: number;
  height: number;
  display_sitename: string;
  doc_url: string;
  datetime: string;
};

export type AxiosPhotoResponseValue = {
  documents: DocumentsType[];
  meta: {
    total_count: number;
    pageable_count: number;
    is_end: boolean;
  };
};

export type RestaurantFromKeywordSearchProps = {
  placeId: string;
  placeName: string; // ex. '자갈치 곰장어' - kakao api
  categories: string[]; // ex. ['음식점', '한식', '해물,생선', '장어'] - kakao api
  roadAddressName: string; // ex. '부산 금정구 오시게로28번길 4' - kakao api
  photoUrls: string[]; // ex. ['https://~', 'https://~', 'https://~', ...] - google api
  kakaoPlaceUrl: string; // ex. "http://place.map.kakao.com/24199893" - kakao api
  phoneNumber: string; // 전화번호 ex. '02-017-3495' - kakao api
  longitude: number; // ex. 129.0868070386026 - kakao api
  latitude: number; // ex. 35.22008482785265 - kakao api
};
