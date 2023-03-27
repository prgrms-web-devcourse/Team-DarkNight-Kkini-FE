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
  const [clickedRestaurant, setClickedRestaurant] = useState<Restaurant>();

  const getNearFoodParty = async (params: NearFoodPartyProps) => {
    const foodPartyResponse = await fetchNearFoodPartyList({ ...params });
    const processedFoodParty = getOneFoodPartyPerRestaurant(foodPartyResponse);
    const newNearFoodParty = addFoodPartyOverlay(processedFoodParty);
    setNearFoodParty(newNearFoodParty);
  };

  const addFoodPartyOverlay = (foodParty: NearFoodPartyItem[]) => {
    return foodParty.map((foodPartyItem) => {
      const { latitude, longitude, placeName, storeId } = foodPartyItem;
      const content = createFoodPartyOverlay({ latitude, longitude, placeName, storeId });
      const overlay = kakaoMapHelpers.makeCustomOverlay(latitude, longitude, content);

      return {
        ...foodPartyItem,
        overlay,
      };
    });
  };

  const handleOnClickRestaurant = async (storeId: number) => {
    const restaurant = await fetchRestaurantDetail(storeId);
    setClickedRestaurant(restaurant);
  };

  useEffect(() => {
    if (!kakaoMap || !nearFoodParty.length) return;

    // overlay 지도에 렌더링 & 이벤트 연결
    nearFoodParty.forEach(({ overlay, storeId }) => {
      if (overlay) {
        overlay.setMap(kakaoMap);

        getElement(`#food-party-overlay-container-${storeId}`)?.addEventListener(
          'click',
          () => {
            handleOnClickRestaurant(storeId);
          }
        );
      }
    });

    return () => {
      // 그려져있던 overlay 삭제 & 이벤트 제거
      if (nearFoodParty.length) {
        nearFoodParty.forEach(({ storeId, overlay }) => {
          getElement(`#food-party-overlay-container-${storeId}`)?.removeEventListener(
            'click',
            () => handleOnClickRestaurant
          );
          if (overlay) {
            overlay.setMap(null);
          }
        });
      }
    };
  }, [nearFoodParty, kakaoMap]);

  return {
    nearFoodParty,
    setNearFoodParty,
    getNearFoodParty,
    clickedRestaurant,
  };
};

export default useNearFoodParty;
