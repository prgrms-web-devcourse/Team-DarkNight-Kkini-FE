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

  const getNearFoodParty = async (props: NearFoodPartyProps) => {
    const foodPartyResponse = await fetchNearFoodPartyList({ ...props });
    const processedFoodParty = getOneFoodPartyPerRestaurant(foodPartyResponse);
    const newNearFooParty = addFoodPartyOverlay(processedFoodParty);
    setNearFoodParty(newNearFooParty);
  };

  const addFoodPartyOverlay = (foodParty: NearFoodPartyItem[]) => {
    return foodParty.map((props) => {
      const { latitude, longitude, placeName, storeId } = props;
      const content = createFoodPartyOverlay({ latitude, longitude, placeName, storeId });
      const overlay = kakaoMapHelpers.makeCustomOverlay(latitude, longitude, content);

      return {
        ...props,
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

    // overlay 지도에 렌더링 & 이벤트 걸기
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
      // 이전 오버레이 삭제 & 이벤트 제거
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
  }, [nearFoodParty]);

  return {
    nearFoodParty,
    setNearFoodParty,
    getNearFoodParty,
    clickedRestaurant,
  };
};

export default useNearFoodParty;
