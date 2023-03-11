import { axiosApi } from 'apis/axios';
import useKakaoMapContext from 'contexts/kakaoMap';
import { useEffect, useState } from 'react';
import { getUniqueRestaurant } from 'utils/helpers/foodParty';
import { kakaoMapHelpers } from 'utils/helpers/kakaoMap';

export type NearFoodPartyItem = {
  latitude: number;
  longitude: number;
  storeId: number;
  placeName: string;
};

type NearFoodPartyProps = {
  latitude: number;
  longitude: number;
  distance: number;
};

type NearFoodPartyResponse = {
  data: {
    responses: NearFoodPartyItem[];
  };
};

const FOOD_PARTY_BADGE_IMAGE_FILE_PATH = 'images/rice.png';

const createFoodPartyOverlay = ({ placeName, storeId }: NearFoodPartyItem) => {
  return `
		<div 
			id="food-party-overlay-container-${placeName}" 
			style="
				display: flex;
				flex-direction: column; 
				align-items: center; 
			">
			<img 
				src=${FOOD_PARTY_BADGE_IMAGE_FILE_PATH}
				alt=${placeName}의 밥모임
				style="
					width:40px; 
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
  const { kakaoMap, setKakaoMap } = useKakaoMapContext();
  const [nearFoodParty, setNearFoodParty] = useState<NearFoodPartyItem[]>([]);
  const [foodPartyOverlay, setFoodPartyOverlay] = useState<kakao.maps.CustomOverlay[]>(
    []
  );

  const getNearFoodParty = async ({
    latitude,
    longitude,
    distance,
  }: NearFoodPartyProps) => {
    const params = {
      latitude,
      longitude,
      distance,
    };

    const {
      data: {
        data: { responses },
      },
    } = await axiosApi.get<NearFoodPartyResponse>('/api/v1/crews', {
      params,
    });

    const uniqueRestaurant = getUniqueRestaurant(responses);
    setNearFoodParty(uniqueRestaurant);
  };

  useEffect(() => {
    if (!kakaoMap || !nearFoodParty.length) return;

    // 현재있는 마커 지우기
    if (foodPartyOverlay.length) {
      foodPartyOverlay.forEach((marker) => marker.setMap(null));
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
        return overlay;
      }
    );

    setFoodPartyOverlay(newFoodPartyOverlayList);
    console.log(`draw food party`);
  }, [nearFoodParty]);

  return {
    nearFoodParty,
    setNearFoodParty,
    getNearFoodParty,
  };
};

export default useNearFoodParty;
