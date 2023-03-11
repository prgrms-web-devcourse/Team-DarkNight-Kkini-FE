import { axiosApi } from 'apis/axios';
import useKakaoMapContext from 'contexts/kakaoMap';
import { useEffect, useState } from 'react';

type NearFoodPartyItem = {
  latitude: number;
  longitude: number;
  storeId: number;
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

const useNearFoodParty = () => {
  const { kakaoMap, setKakaoMap } = useKakaoMapContext();
  const [nearFoodParty, setNearFoodParty] = useState<NearFoodPartyItem[]>([]);
  const [foodPartyMarker, setFoodPartyMarker] = useState<kakao.maps.Marker[]>([]);

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
    setNearFoodParty(responses);
  };

  useEffect(() => {
    if (!kakaoMap || !nearFoodParty.length) return;

    // 현재있는 마커 지우기
    if (foodPartyMarker.length) {
      foodPartyMarker.forEach((marker) => marker.setMap(null));
    }

    const newFoodPartyMarkerList = nearFoodParty.map(({ latitude, longitude }) => {
      const markerImage = new kakao.maps.MarkerImage(
        FOOD_PARTY_BADGE_IMAGE_FILE_PATH,
        new kakao.maps.Size(40, 45)
      );
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(latitude, longitude),
        image: markerImage,
      });
      marker.setMap(kakaoMap);
      return marker;
    });

    setFoodPartyMarker(newFoodPartyMarkerList);
    console.log(`draw food party`);
  }, [nearFoodParty]);

  return {
    nearFoodParty,
    setNearFoodParty,
    getNearFoodParty,
  };
};

export default useNearFoodParty;
