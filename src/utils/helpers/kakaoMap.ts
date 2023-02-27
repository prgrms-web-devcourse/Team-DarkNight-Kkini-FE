import { KakaoMapOptions } from 'types/kakaoMap';

const RESTAURANT_BADGE_IMAGE_FILE_PATH = '/images/restaurant-badge.svg';
const DEFAULT_BADGE_IMAGE_SIZE = 72;

const makeRandomIndex = (count: number) => {
  const result = Math.floor(Math.random() * count);

  return result;
};

export const getRandomRestaurantWithKakaoMapAPI = (
  kakaoMap: kakao.maps.Map,
  // kakaoMapOptions: KakaoMapOptions,
  radius: number,
  categoryCode: 'FD6'
) => {
  const kakaoPlacesService = new kakao.maps.services.Places();
  const currentLatitude = kakaoMap.getCenter().getLat();
  const currentLongitude = kakaoMap.getCenter().getLng();
  const placesSearchOptions: kakao.maps.services.PlacesSearchOptions = {
    x: currentLongitude,
    y: currentLatitude,
    radius,
  };

  const nearbyRestaurants: kakao.maps.services.PlacesSearchResultItem[] = [];
  let createdMarker: kakao.maps.Marker | null = null;
  kakaoPlacesService.categorySearch(
    categoryCode,
    (result, status, pagination) => {
      const { OK, ZERO_RESULT, ERROR } = kakao.maps.services.Status;

      if (status === OK) {
        nearbyRestaurants.push(...result);
        pagination.hasNextPage && pagination.nextPage();
      }

      if (!pagination.hasNextPage) {
        const randomIndex = makeRandomIndex(nearbyRestaurants.length);
        const markerImage = new kakao.maps.MarkerImage(
          RESTAURANT_BADGE_IMAGE_FILE_PATH,
          new kakao.maps.Size(DEFAULT_BADGE_IMAGE_SIZE, DEFAULT_BADGE_IMAGE_SIZE)
        );
        createdMarker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(
            Number(nearbyRestaurants[randomIndex].y),
            Number(nearbyRestaurants[randomIndex].x)
          ),
          image: markerImage,
        });
      }
    },
    placesSearchOptions
  );
};
