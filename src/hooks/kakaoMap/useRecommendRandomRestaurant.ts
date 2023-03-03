import { useToast } from '@chakra-ui/react';
import useKakaoMapContext from 'contexts/kakaoMap';
import useRandomRestaurantContext from 'contexts/kakaoMap/randomRestaurant';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { kakaoMapOptionsState } from 'stores/kakaoMap';
import ERROR_MESSAGE from 'utils/constants/errorMessage';
import { kakaoMapHelpers } from 'utils/helpers/kakaoMap';

import { getNearbyRestaurants } from './../../utils/helpers/kakaoMap';

const DEFAULT_BADGE_IMAGE_SIZE = 72;
const RESTAURANT_BADGE_IMAGE_FILE_PATH = '/images/restaurant-badge.svg';

const useRecommendRandomRestaurant = () => {
  const [recommendRandomRestaurantIsLoading, setRecommendRandomRestaurantIsLoading] =
    useState(false);
  const setKakaoMapOptions = useSetRecoilState(kakaoMapOptionsState);
  const { kakaoMap } = useKakaoMapContext();
  const { setRandomRestaurant, handleOpenRandomRestaurantModal } =
    useRandomRestaurantContext();
  const errorToast = useToast({
    duration: 5000,
    status: 'error',
    position: 'bottom',
    isClosable: true,
  });

  const recommendRandomRestaurant = async () => {
    if (!kakaoMap) return;

    setRecommendRandomRestaurantIsLoading(true);

    try {
      const { latitude: currentLatitude, longitude: currentLongitude } =
        kakaoMapHelpers.getCenter(kakaoMap);
      const nearbyRestaurants = await getNearbyRestaurants({
        latitude: currentLatitude,
        longitude: currentLongitude,
      });
      const randomIndex = Math.floor(Math.random() * nearbyRestaurants.length);
      const randomRestaurant = nearbyRestaurants[randomIndex];
      const {
        place_name: placeName,
        category_name: categoryName,
        road_address_name: roadAddressName,
        place_url: kakaoPlaceUrl,
        phone: phoneNumber,
        distance,
      } = randomRestaurant;
      const categories = categoryName.split('>').map((category) => category.trim());
      const createdCustomOverlay = new kakao.maps.CustomOverlay({
        position: new kakao.maps.LatLng(
          Number(randomRestaurant.y),
          Number(randomRestaurant.x)
        ),
        clickable: true,
        content: makeRandomRestaurantOverlayContent({
          placeName,
          latitude: Number(randomRestaurant.y),
          longitude: Number(randomRestaurant.x),
        }),
      });

      setRandomRestaurant({
        placeName,
        categories,
        roadAddressName,
        kakaoPlaceUrl,
        phoneNumber,
        distance: Number(distance),
        customOverlay: createdCustomOverlay,
      });
      setKakaoMapOptions((previousKakaoMapOptions) => ({
        ...previousKakaoMapOptions,
        center: {
          lat: currentLatitude,
          lng: currentLongitude,
        },
      }));
    } catch (error) {
      errorToast({
        title: ERROR_MESSAGE.CANNOT_GET_RANDOM_RESTAURANT_FROM_CURRENT_POSITION,
      });
      // To Do: 배포 시 지울 필요 있음. by 승준
      console.error(error);
    } finally {
      setRecommendRandomRestaurantIsLoading(false);
    }
  };

  /**
   * To Do: placeName 나오는 부분 스타일링 필요 by 승준
   */
  const makeRandomRestaurantOverlayContent = ({
    placeName,
    latitude,
    longitude,
  }: {
    placeName: string;
    latitude: number;
    longitude: number;
  }) => {
    const containerElement = document.createElement('div');
    containerElement.innerHTML = `<img
                                    class='random-restaurant-custom-overlay'
                                    src=${RESTAURANT_BADGE_IMAGE_FILE_PATH}
                                    style="
                                      width: ${DEFAULT_BADGE_IMAGE_SIZE}px;
                                      height: ${DEFAULT_BADGE_IMAGE_SIZE}px;
                                      z-index: 11;
                                      border-radius: 50%;
                                      box-shadow: 5px 5px 7px 5px rgba(0, 0, 0, 0.25);
                                    "
                                  />
                                  <div style='background-color: white; padding: 0.5rem;'>${placeName}</div>`;
    containerElement.onclick = () => {
      if (!kakaoMap) return;

      handleOpenRandomRestaurantModal();
      kakaoMapHelpers.panto({ kakaoMap, latitude, longitude });
    };

    return containerElement;
  };

  return {
    recommendRandomRestaurant,
    recommendRandomRestaurantIsLoading,
  };
};

export default useRecommendRandomRestaurant;
