import { Box, useToast, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import ERROR_MESSAGE from 'utils/constants/errorMessage';

import CurrentLocationButton from './CurrentLocationButton';
import ZoomInButton from './ZoomInButton';
import ZoomOutButton from './ZoomOutButton';

/**
 * To Do
 * 초기 위치를 localStorage로부터 받아온다.
 */
const INIT_LATITUDE = 37.497969;
const INIT_LONGITUDE = 127.02759;
const INIT_MAP_LEVEL = 5;
const MAX_LEVEL = 12;
const MIN_LEVEL = 0;

const INIT_TOAST_DURATION = 5000;

const KakaoMap = () => {
  const [mapOptions, setMapOptions] = useState({
    center: { lat: INIT_LATITUDE, lng: INIT_LONGITUDE },
    level: INIT_MAP_LEVEL,
  });
  const [kakaoMap, setKakaoMap] = useState<kakao.maps.Map>();
  const [currentLocationIsLoading, setCurrentLocationIsLoading] = useState(false);
  const errorToast = useToast({
    duration: INIT_TOAST_DURATION,
    position: 'bottom',
    status: 'error',
  });

  const handleCreateMap = (map: kakao.maps.Map) => {
    setKakaoMap(map);
  };

  const handleClickCurrentLocationButton = () => {
    const successCallback: PositionCallback = ({ coords: { latitude, longitude } }) => {
      setMapOptions((previousMapOptions) => ({
        ...previousMapOptions,
        center: {
          lat: latitude,
          lng: longitude,
        },
      }));

      if (kakaoMap) {
        kakaoMap.setCenter(new kakao.maps.LatLng(latitude, longitude));
      }
      setCurrentLocationIsLoading(false);
    };

    const errorCallback: PositionErrorCallback = (error) => {
      errorToast({
        title: error.message,
      });
      setCurrentLocationIsLoading(false);
    };

    if (navigator.geolocation) {
      setCurrentLocationIsLoading(true);
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      errorToast({
        title: ERROR_MESSAGE.CANNOT_GET_LOCATION_INFORMATION,
      });
    }
  };

  const handleClickZoomInButton = () => {
    const currentLevel = mapOptions.level;

    if (currentLevel <= MIN_LEVEL) return;

    setMapOptions((previousMapOptions) => ({
      ...previousMapOptions,
      level: previousMapOptions.level - 1,
    }));
  };

  const handleClickZoomOutButton = () => {
    const currentLevel = mapOptions.level;

    if (currentLevel >= MAX_LEVEL) return;

    setMapOptions((previousMapOptions) => ({
      ...previousMapOptions,
      level: previousMapOptions.level + 1,
    }));
  };

  return (
    <Box position='relative' width='100%' height='100%'>
      <Map
        center={mapOptions.center}
        style={{ width: '100%', height: '100%' }}
        level={mapOptions.level}
        onCreate={handleCreateMap}
      />
      <VStack position='absolute' top='3rem' right='1rem'>
        <CurrentLocationButton
          onClick={handleClickCurrentLocationButton}
          isLoading={currentLocationIsLoading}
        />
        <ZoomInButton onClick={handleClickZoomInButton} />
        <ZoomOutButton onClick={handleClickZoomOutButton} />
      </VStack>
    </Box>
  );
};

export default KakaoMap;
