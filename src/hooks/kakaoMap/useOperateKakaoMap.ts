import { useToast } from '@chakra-ui/react';
import useKakaoMapContext from 'contexts/kakaoMap';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { kakaoMapOptionsState } from 'stores/kakaoMap';
import ERROR_MESSAGE from 'utils/constants/errorMessage';
import { kakaoMapHelpers } from 'utils/helpers/kakaoMap';

const DEFAULT_MIN_LEVEL = 0;
const DEFAULT_MAX_LEVEL = 12;

const DEFAULT_TOAST_DURATION = 5000;

const useOperateKakaoMap = () => {
  const [kakaoMapOptions, setKakaoMapOptions] = useRecoilState(kakaoMapOptionsState);
  const [moveToCurrentLocationIsLoading, setMoveToCurrentLocationIsLoading] =
    useState(false);
  const errorToast = useToast({
    duration: DEFAULT_TOAST_DURATION,
    position: 'bottom',
    status: 'error',
  });
  const { kakaoMap } = useKakaoMapContext();

  const moveToCurrentLocation = () => {
    const successCallback: PositionCallback = ({ coords: { latitude, longitude } }) => {
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

  const zoomIn = () => {
    const currentLevel = kakaoMapOptions.level;

    if (currentLevel <= DEFAULT_MIN_LEVEL) return;
    if (!kakaoMap) return;

    const { latitude: currentLatitude, longitude: currentLongitude } =
      kakaoMapHelpers.getCenter(kakaoMap);

    setKakaoMapOptions((previousKakaoMapOptions) => ({
      ...previousKakaoMapOptions,
      center: {
        lat: currentLatitude,
        lng: currentLongitude,
      },
      level: previousKakaoMapOptions.level - 1,
    }));
  };

  const zoomOut = () => {
    const currentLevel = kakaoMapOptions.level;

    if (currentLevel >= DEFAULT_MAX_LEVEL) return;
    if (!kakaoMap) return;

    const { latitude: currentLatitude, longitude: currentLongitude } =
      kakaoMapHelpers.getCenter(kakaoMap);

    setKakaoMapOptions((previousKakaoMapOptions) => ({
      ...previousKakaoMapOptions,
      center: {
        lat: currentLatitude,
        lng: currentLongitude,
      },
      level: previousKakaoMapOptions.level + 1,
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
