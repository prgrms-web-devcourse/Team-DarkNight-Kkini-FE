import { Box, useToast, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import ERROR_MESSAGE from 'utils/constants/errorMessage';

import RecommendRandomRestaurantButton from '../Buttons/RecommendRandomRestaurantButton';
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

const KAKAO_RESTAURANT_CATEGORY_CODE = 'FD6';
const INIT_RADIUS = 300;

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

  //////////////////////////////////////////////////////////////////////////////////////////
  // To Do
  // 해당 버튼 로딩
  const handleClickRecommendRandomRestaurantButton = () => {
    const kakaoPlacesService = new kakao.maps.services.Places();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
        // 이렇게 하면 현재 위치를 들렸다가 랜덤 맛집으로 이동한다.
        setMapOptions((previousMapOptions) => ({
          ...previousMapOptions,
          center: {
            lat: latitude,
            lng: longitude,
          },
        }));

        // if (kakaoMap) {
        //   kakaoMap.setCenter(new kakao.maps.LatLng(latitude, longitude));
        // }

        const placesSearchOptions: kakao.maps.services.PlacesSearchOptions = {
          x: longitude,
          y: latitude,
          radius: INIT_RADIUS,
        };

        const nearbyPlaces: kakao.maps.services.PlacesSearchResultItem[] = [];

        kakaoPlacesService.categorySearch(
          KAKAO_RESTAURANT_CATEGORY_CODE,
          (result, status, pagination) => {
            const { OK, ZERO_RESULT, ERROR } = kakao.maps.services.Status;
            if (status === OK) {
              nearbyPlaces.push(...result);

              pagination.nextPage();
            }

            if (!pagination.hasNextPage && kakaoMap) {
              const bounds = new kakao.maps.LatLngBounds();
              bounds.extend(
                new kakao.maps.LatLng(
                  Number(nearbyPlaces[0].y),
                  Number(nearbyPlaces[0].x)
                )
              );
              kakaoMap.setBounds(bounds);
            }

            // To Do
            // 서칭 결과 없을 때 toast UI 띄우기
            // if (status === ZERO_RESULT) {}

            // 서칭 에러 시 toast UI 띄우기
            // if (status === ERROR) {}
          },
          placesSearchOptions
        );
      });
    } else {
      // 현재 위치를 얻을 수 없다고 toast UI 띄우기
    }
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
      <RecommendRandomRestaurantButton
        onClick={handleClickRecommendRandomRestaurantButton}
      />
    </Box>
  );
};

export default KakaoMap;
