import { useToast } from '@chakra-ui/react';
import useKakaoMapContext from 'contexts/kakaoMap';
import useRandomRestaurantContext from 'contexts/kakaoMap/randomRestaurant';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { kakaoMapOptionsState } from 'stores/kakaoMap';
import ERROR_MESSAGE from 'utils/constants/errorMessage';
import { kakaoMapHelpers } from 'utils/helpers/kakaoMap';
import { getKeywordPhotos } from 'utils/helpers/kakaoSearch';

import { getNearbyRestaurants } from '../../utils/helpers/kakaoMap';

const DEFAULT_BADGE_IMAGE_SIZE = 72;
const RESTAURANT_BADGE_IMAGE_FILE_PATH = '/images/restaurant-badge.svg';

const useRecommendRandomRestaurant = () => {
  const [recommendRandomRestaurantIsLoading, setRecommendRandomRestaurantIsLoading] =
    useState(false);
  const setKakaoMapOptions = useSetRecoilState(kakaoMapOptionsState);
  const { kakaoMap } = useKakaoMapContext();
  const { setRandomRestaurant } = useRandomRestaurantContext();
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
      const nearbyRestaurants = await getNearbyRestaurants(
        currentLatitude,
        currentLongitude
      );
      const randomIndex = Math.floor(Math.random() * nearbyRestaurants.length);
      const randomRestaurant = nearbyRestaurants[randomIndex];
      const {
        id: placeId,
        place_name: placeName,
        category_name: categoryName,
        address_name: addressName,
        road_address_name: roadAddressName,
        place_url: kakaoPlaceUrl,
        phone: phoneNumber,
        distance,
        x: longitude,
        y: latitude,
      } = randomRestaurant;
      const result = await getKeywordPhotos(addressName, placeName, 5);
      const photoUrls = result.documents.map(({ image_url: imageUrl }) => imageUrl);
      const categories = categoryName.split('>').map((category) => category.trim());

      // To Do: placeName 나오는 부분 스타일링 필요 by 승준
      const createdRandomRestaurantCustomOverlay = kakaoMapHelpers.makeCustomOverlay(
        Number(randomRestaurant.y),
        Number(randomRestaurant.x),
        `
          <div id="random-restaurant-custom-overlay-container">
            <img
            class='random-restaurant-custom-overlay'
            src=${RESTAURANT_BADGE_IMAGE_FILE_PATH}
            style="
              width: ${DEFAULT_BADGE_IMAGE_SIZE}px;
              height: ${DEFAULT_BADGE_IMAGE_SIZE}px;
              z-index: 11;
              border-radius: 50%;
              box-shadow: 5px 5px 7px 5px rgba(0, 0, 0, 0.25);
            "/>
            <div style='background-color: white; padding: 0.5rem;'>${placeName}</div>
          </div>
        `
      );

      setRandomRestaurant({
        placeId: Number(placeId),
        placeName,
        categories,
        roadAddressName,
        kakaoPlaceUrl,
        phoneNumber,
        photoUrls,
        distance: Number(distance),
        latitude: Number(latitude),
        longitude: Number(longitude),
        customOverlay: createdRandomRestaurantCustomOverlay,
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

  return {
    recommendRandomRestaurant,
    recommendRandomRestaurantIsLoading,
  };
};

export default useRecommendRandomRestaurant;
