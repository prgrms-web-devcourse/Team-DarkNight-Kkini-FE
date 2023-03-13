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

type keywordSearchOptionsType = {
  category_group_code: string;
  x: number;
  y: number;
  radius: number;
};

export const kakaoMapHelpers = {
  panto: ({
    kakaoMap,
    latitude,
    longitude,
  }: {
    kakaoMap?: kakao.maps.Map;
    latitude?: number;
    longitude?: number;
  }) => {
    if (!kakaoMap || !latitude || !longitude) return;
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
  makeCustomOverlay: (latitude: number, longitude: number, content: string) =>
    new kakao.maps.CustomOverlay({
      position: new kakao.maps.LatLng(latitude, longitude),
      content,
    }),
  getLongitude: (kakaoMap: kakao.maps.Map) => {
    const { longitude } = kakaoMapHelpers.getCenter(kakaoMap);
    const northLongitude = kakaoMap.getBounds().getNorthEast().getLng();
    return {
      centerLongitude: longitude,
      northLongitude,
    };
  },
  getDistanceFromLongitude: (kakaoMap: kakao.maps.Map) => {
    const { centerLongitude, northLongitude } = kakaoMapHelpers.getLongitude(kakaoMap);

    // 한국기준, 0.01도 = 800m
    const LONGITUDE = {
      DEGREE: 0.01,
      METER: 800,
    };
    const gapOfLongitude = Number(Math.abs(centerLongitude - northLongitude).toFixed(3));
    const distance = (LONGITUDE.METER * gapOfLongitude) / LONGITUDE.DEGREE;
    return Math.floor(distance);
  },
};

export const kakaoMapAddEventListener = (
  eventTarget: kakao.maps.event.EventTarget,
  type: KakaoMapEventType,
  callback: () => void
) => {
  kakao.maps.event.addListener(eventTarget, type, callback);
};

export const getNearbyRestaurants = (
  latitude: number,
  longitude: number,
  kakaoMap: kakao.maps.Map
): Promise<kakao.maps.services.PlacesSearchResultItem[]> => {
  const KAKAO_RESTAURANT_CATEGORY_CODE = 'FD6';

  const nearbyRestaurants: kakao.maps.services.PlacesSearchResultItem[] = [];
  const kakaoPlacesService = new kakao.maps.services.Places();
  const placesSearchOptions: kakao.maps.services.PlacesSearchOptions = {
    x: longitude,
    y: latitude,
    radius: kakaoMapHelpers.getDistanceFromLongitude(kakaoMap),
  };
  console.log(kakaoMapHelpers.getDistanceFromLongitude(kakaoMap));

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

export const keywordSearch = (
  kakaoPlaces: kakao.maps.services.Places,
  keyword: string,
  options: keywordSearchOptionsType
): Promise<kakao.maps.services.PlacesSearchResult> => {
  return new Promise((resolve, reject) => {
    kakaoPlaces.keywordSearch(
      keyword,
      (result, status) => {
        const { OK, ZERO_RESULT } = kakao.maps.services.Status;
        if (status === OK || status === ZERO_RESULT) {
          resolve(result);
        } else {
          reject(result);
        }
      },
      options
    );
  });
};
