import { useToast } from '@chakra-ui/react';
import useKakaoMapContext from 'contexts/kakaoMap';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { kakaoMapOptionsState } from 'stores/kakaoMap';
import ERROR_MESSAGE from 'utils/constants/errorMessage';
import { kakaoMapHelpers } from 'utils/helpers/kakaoMap';

const DEFAULT_MIN_LEVEL = 0;
const DEFAULT_MAX_LEVEL = 12;

const DEFAULT_TOAST_DURATION = 5000;

const useOperateKakaoMap = () => {
  const setKakaoMapOptions = useSetRecoilState(kakaoMapOptionsState);
  const [moveToCurrentLocationIsLoading, setMoveToCurrentLocationIsLoading] =
    useState(false);
  const errorToast = useToast({
    duration: DEFAULT_TOAST_DURATION,
    position: 'bottom',
    status: 'error',
  });
  const { kakaoMap } = useKakaoMapContext();

  // 현재 위치로 카카오맵을 이동
  const moveToCurrentLocation = () => {
    const successCallback: PositionCallback = ({ coords: { latitude, longitude } }) => {
      if (!kakaoMap) return;
      kakaoMapHelpers.panto({
        kakaoMap,
        latitude,
        longitude,
      });
      setKakaoMapOptions((previousKakaoMapOptions) => ({
        ...previousKakaoMapOptions,
        center: {
          lat: latitude,
          lng: longitude,
        },
      }));
      setMoveToCurrentLocationIsLoading(false);
    };

    const errorCallback: PositionErrorCallback = (error) => {
      ({
        title: error.message,
      });
      setMoveToCurrentLocationIsLoading(false);
    };

    // HTTPS, HTML5 이상 환경에서만 사용이 가능
    // 사용 가능 시, 위치를 성공적으로 가져왔을 때 successCallback 수행하고 위치를 가져오는 데에 실패하면 errorCallback 수행
    if (navigator.geolocation) {
      setMoveToCurrentLocationIsLoading(true);
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      errorToast({
        title: ERROR_MESSAGE.CANNOT_GET_LOCATION_INFORMATION,
      });
    }
  };

  // 카카오맵 확대
  const zoomIn = () => {
    if (!kakaoMap) return;
    const currentLevel = kakaoMapHelpers.getLevel(kakaoMap);

    if (currentLevel <= DEFAULT_MIN_LEVEL) return;
    kakaoMapHelpers.setLevel({
      kakaoMap,
      nextLevel: currentLevel - 1,
    });
    const { latitude: currentLatitude, longitude: currentLongitude } =
      kakaoMapHelpers.getCenter(kakaoMap);
    setKakaoMapOptions((previousKakaoMapOptions) => ({
      ...previousKakaoMapOptions,
      center: {
        lat: currentLatitude,
        lng: currentLongitude,
      },
      level: currentLevel - 1,
    }));
  };

  // 카카오맵 축소
  const zoomOut = () => {
    if (!kakaoMap) return;
    const currentLevel = kakaoMapHelpers.getLevel(kakaoMap);

    if (currentLevel >= DEFAULT_MAX_LEVEL) return;
    kakaoMapHelpers.setLevel({
      kakaoMap,
      nextLevel: currentLevel + 1,
    });
    const { latitude: currentLatitude, longitude: currentLongitude } =
      kakaoMapHelpers.getCenter(kakaoMap);
    setKakaoMapOptions((previousKakaoMapOptions) => ({
      ...previousKakaoMapOptions,
      center: {
        lat: currentLatitude,
        lng: currentLongitude,
      },
      level: currentLevel + 1,
    }));
  };

  return {
    moveToCurrentLocation,
    moveToCurrentLocationIsLoading,
    zoomIn,
    zoomOut,
  };
};

export default useOperateKakaoMap;
