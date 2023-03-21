import useKakaoMapContext from 'contexts/kakaoMap';
import { useEffect, useState } from 'react';
import { fetchNearFoodPartyList } from 'services/foodParty';
import { fetchRestaurantDetail } from 'services/restaurant';
import { NearFoodPartyItem, NearFoodPartyProps } from 'types/foodParty';
import { Restaurant } from 'types/restaurant';
import { getElement } from 'utils/helpers/elementHandler';
import { getOneFoodPartyPerRestaurant } from 'utils/helpers/foodParty';
import { kakaoMapHelpers } from 'utils/helpers/kakaoMap';

const FOOD_PARTY_BADGE_IMAGE_FILE_PATH = 'images/rice.png';

const createFoodPartyOverlay = ({ placeName, storeId }: NearFoodPartyItem) => {
  return `
		<div 
			id="food-party-overlay-container-${storeId}" 
			style="
				display: flex;
				flex-direction: column; 
				align-items: center; 
			">
			<img 
				src=${FOOD_PARTY_BADGE_IMAGE_FILE_PATH}
				alt=${placeName}의밥모임
				style="
					width: 40px; 
					height: 40px; 
				"
			/>
			<div 
				style="
					font-size: 0.7rem; 
					background-color: #61605E;
					opacity: 80%;
					border-radius: 0.25rem;  
					color: white; 
					font-weight: 600;
					padding: 0.2rem;
			">${placeName}</div>
		</div>
	`;
};

const useNearFoodParty = () => {
  const { kakaoMap } = useKakaoMapContext();
  const [nearFoodParty, setNearFoodParty] = useState<NearFoodPartyItem[]>([]);
  const [foodPartyOverlay, setFoodPartyOverlay] = useState<kakao.maps.CustomOverlay[]>(
    []
  );
  const [clickedRestaurant, setClickedRestaurant] = useState<Restaurant>();

  const getNearFoodParty = async (props: NearFoodPartyProps) => {
    const newNearFoodParty = await fetchNearFoodPartyList({ ...props });
    const processedFoodParty = getOneFoodPartyPerRestaurant(newNearFoodParty);
    setNearFoodParty(processedFoodParty);
  };

  const handleOnClickRestaurant = async (storeId: number) => {
    const restaurant = await fetchRestaurantDetail(storeId);
    setClickedRestaurant(restaurant);
  };

  useEffect(() => {
    if (!kakaoMap || !nearFoodParty.length) return;

    // 현재있는 마커 지우기
    if (foodPartyOverlay.length) {
      foodPartyOverlay.forEach((overlay) => overlay.setMap(null));
    }

    const newFoodPartyOverlayList = nearFoodParty.map(
      ({ latitude, longitude, placeName, storeId }) => {
        const content = createFoodPartyOverlay({
          latitude,
          longitude,
          placeName,
          storeId,
        });
        const overlay = kakaoMapHelpers.makeCustomOverlay(latitude, longitude, content);
        overlay.setMap(kakaoMap);

        getElement(`#food-party-overlay-container-${storeId}`)?.addEventListener(
          'click',
          () => {
            handleOnClickRestaurant(storeId);
          }
        );

        return overlay;
      }
    );

    setFoodPartyOverlay(newFoodPartyOverlayList);

    return () => {
      if (nearFoodParty.length) {
        nearFoodParty.forEach(({ storeId }) =>
          getElement(`#food-party-overlay-container-${storeId}`)?.removeEventListener(
            'click',
            () => handleOnClickRestaurant
          )
        );
      }
    };
  }, [nearFoodParty]);

  return {
    nearFoodParty,
    setNearFoodParty,
    getNearFoodParty,
    clickedRestaurant,
  };
};

export default useNearFoodParty;
