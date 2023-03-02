import ERROR_MESSAGE from 'utils/constants/errorMessage';

/**
 * https://apis.map.kakao.com/web/documentation/
 * 위 링크에서 Docs의 Events 항목에 나오는 이벤트 타입들을 참고하여 KakaoMapEventType 지정.
 */
type KakaoMapEventType =
  | 'center_changed'
  | 'zoom_start'
  | 'zoom_changed'
  | 'bounds_changed'
  | 'click'
  | 'dblclick'
  | 'rightclick'
  | 'mousemove'
  | 'dragstart'
  | 'drag'
  | 'dragend'
  | 'idle'
  | 'tilesloaded'
  | 'maptypeid_changed';

export const kakaoMapHelpers = {
  panto: ({
    kakaoMap,
    latitude,
    longitude,
  }: {
    kakaoMap: kakao.maps.Map;
    latitude: number;
    longitude: number;
  }) => {
    kakaoMap.panTo(new kakao.maps.LatLng(latitude, longitude));
  },
  getCenter: (kakaoMap: kakao.maps.Map) => ({
    latitude: kakaoMap.getCenter().getLat(),
    longitude: kakaoMap.getCenter().getLng(),
  }),
  getLevel: (kakaoMap: kakao.maps.Map) => kakaoMap.getLevel(),
  setLevel: ({
    kakaoMap,
    nextLevel,
  }: {
    kakaoMap: kakao.maps.Map;
    nextLevel: number;
  }) => {
    kakaoMap.setLevel(nextLevel);
  },
};

export const kakaoMapAddEventListener = (
  eventTarget: kakao.maps.event.EventTarget,
  type: KakaoMapEventType,
  callback: () => void
) => {
  kakao.maps.event.addListener(eventTarget, type, callback);
};

export const getNearbyRestaurants = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}): Promise<kakao.maps.services.PlacesSearchResultItem[]> => {
  const DEFAULT_RADIUS = 300;
  const KAKAO_RESTAURANT_CATEGORY_CODE = 'FD6';

  const nearbyRestaurants: kakao.maps.services.PlacesSearchResultItem[] = [];
  const kakaoPlacesService = new kakao.maps.services.Places();
  const placesSearchOptions: kakao.maps.services.PlacesSearchOptions = {
    x: longitude,
    y: latitude,
    radius: DEFAULT_RADIUS,
  };

  return new Promise((resolve, reject) => {
    kakaoPlacesService.categorySearch(
      KAKAO_RESTAURANT_CATEGORY_CODE,
      (result, status, pagination) => {
        const { OK, ZERO_RESULT, ERROR } = kakao.maps.services.Status;
        if (status === OK) {
          nearbyRestaurants.push(...result);
          pagination.hasNextPage && pagination.nextPage();
        }

        if (!pagination.hasNextPage || status === ZERO_RESULT) {
          resolve(nearbyRestaurants);
        }

        if (status === ERROR) {
          reject(new Error(ERROR_MESSAGE.REQUEST_FAILED_BY_KAKAO_MAP_SERVER_ERROR));
        }
      },
      placesSearchOptions
    );
  });
};
