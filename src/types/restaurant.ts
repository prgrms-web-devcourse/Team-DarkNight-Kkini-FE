export type RestaurantFromKeywordSearchProps = {
  category_name: string; // ex. '음식점 > 한식 > 해물,생선 > 장어'
  place_name: string; // ex. '자갈치 곰장어'
  road_address_name: string; // ex. '부산 금정구 오시게로28번길 4'
  x: number; // ex. 129.0868070386026
  y: number; // ex. 35.22008482785265
  image_url: string[]; // ex. ['https://~', 'https://~', 'https://~', ...]
};
