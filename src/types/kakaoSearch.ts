export type DocumentsType = {
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

export type RestaurantType = {
  placeId: string;
  placeName: string;
  categories: string;
  roadAddressName: string;
  kakaoPlaceUrl: string;
  phoneNumber: string;
  longitude: number;
  latitude: number;
};

export type RestaurantFromKeywordSearchProps = {
  photoUrls: string[];
} & RestaurantType;
