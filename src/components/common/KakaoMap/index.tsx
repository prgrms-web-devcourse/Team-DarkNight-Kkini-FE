import { Box, useToast, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { Map, MapMarker, MapMarkerProps } from 'react-kakao-maps-sdk';
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
  const [randomRestaurantMarker, setRandomRestaurantMarker] =
    useState<MapMarkerProps | null>(null);
  const [randomRestaurantIsLoading, setRandomRestaurantIsLoading] = useState(false);

  const handleClickRecommendRandomRestaurantButton = () => {
    const kakaoPlacesService = new kakao.maps.services.Places();

    if (navigator.geolocation) {
      setRandomRestaurantIsLoading(true);
      navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
        // 이렇게 하면 현재 위치를 들렸다가 랜덤 맛집으로 이동한다.
        // mapOptions는 따로 저장해야 될 수도 있겠다.
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

        const nearbyRestaurants: kakao.maps.services.PlacesSearchResultItem[] = [];
        kakaoPlacesService.categorySearch(
          KAKAO_RESTAURANT_CATEGORY_CODE,
          (result, status, pagination) => {
            const { OK, ZERO_RESULT, ERROR } = kakao.maps.services.Status;
            if (status === OK) {
              nearbyRestaurants.push(...result);

              pagination.nextPage();
            }

            if (!pagination.hasNextPage && kakaoMap) {
              const bounds = new kakao.maps.LatLngBounds();
              const randomIndex = Math.floor(Math.random() * nearbyRestaurants.length);
              bounds.extend(
                new kakao.maps.LatLng(
                  Number(nearbyRestaurants[randomIndex].y),
                  Number(nearbyRestaurants[randomIndex].x)
                )
              );
              kakaoMap.setBounds(bounds);
              setRandomRestaurantMarker((previousRandomRestaurantMarker) => ({
                ...previousRandomRestaurantMarker,
                position: {
                  lat: Number(nearbyRestaurants[randomIndex].y),
                  lng: Number(nearbyRestaurants[randomIndex].x),
                },
                title: nearbyRestaurants[randomIndex].place_name,
              }));
              setRandomRestaurantIsLoading(false);
            }

            // To Do
            // 서칭 결과 없을 때 toast UI 띄우기
            // if (status === ZERO_RESULT) {
            //   setRandomRestaurantIsLoading(false);
            // }

            // 서칭 에러 시 toast UI 띄우기
            // if (status === ERROR) {
            //   setRandomRestaurantIsLoading(false);
            // }
          },
          placesSearchOptions
        );
      });
    } else {
      // 현재 위치를 얻을 수 없다고 toast UI 띄우기
    }
  };

  const handleClickMapMarker = (event: kakao.maps.Marker) => {
    console.log(event.getTitle());
  };

  console.log(randomRestaurantIsLoading);

  return (
    <Box position='relative' width='100%' height='100%'>
      <Map
        center={mapOptions.center}
        style={{ width: '100%', height: '100%' }}
        level={mapOptions.level}
        onCreate={handleCreateMap}>
        {/* 어떻게 해줘야 randomRestaurantMarker가 있을 때랑 없을 때를 잘 구분할 수 있을까? */}
        {randomRestaurantMarker && (
          <MapMarker
            position={randomRestaurantMarker.position}
            title={randomRestaurantMarker.title}
            onClick={handleClickMapMarker}
            image={{
              src: '/images/restaurant-badge.svg',
              size: {
                width: 72,
                height: 72,
              },
            }}
          />
        )}
      </Map>
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
        isLoading={randomRestaurantIsLoading}
      />
    </Box>
  );
};

export default KakaoMap;
