import { KakaoMapOptions } from 'types/kakaoMap';

export const getRandomRestaurantWithKakaoMapAPI = (
  kakaoMapOptions: KakaoMapOptions,
  radius: number,
  categoryCode: kakao.maps.CategoryCode
) => {
  const kakaoPlacesService = new kakao.maps.services.Places();
  const placesSearchOptions: kakao.maps.services.PlacesSearchOptions = {
    x: kakaoMapOptions.center.lng,
    y: kakaoMapOptions.center.lat,
    radius,
  };

  const nearbyRestaurants: kakao.maps.services.PlacesSearchResultItem[] = [];
  kakaoPlacesService.categorySearch(
    categoryCode,
    (result, status, pagination) => {
      const { OK, ZERO_RESULT, ERROR } = kakao.maps.services.Status;

      if (status === OK) {
        nearbyRestaurants.push(...result);
        pagination.hasNextPage && pagination.nextPage();
      }

      // if (!pagination.hasNextPage)
    },
    placesSearchOptions
  );
};
