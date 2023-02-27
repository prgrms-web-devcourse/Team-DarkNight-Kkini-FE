import { Box, VStack } from '@chakra-ui/react';
import useKakaoMapContext from 'contexts/kakaoMap';
import useRandomRestaurantContext from 'contexts/kakaoMap/randomRestaurant';
import useOperateKakaoMap from 'hooks/kakaoMap/useOperateKakaoMap';
import useRecommendRandomRestaurant from 'hooks/kakaoMap/useRecommendRandomRestaurant';
import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { kakaoMapOptionsState } from 'stores/kakaoMap';

import RecommendRandomRestaurantButton from '../Buttons/RecommendRandomRestaurantButton';
import CurrentLocationButton from './CurrentLocationButton';
import ZoomInButton from './ZoomInButton';
import ZoomOutButton from './ZoomOutButton';

const KAKAO_MARKER_EVENT_TYPE = {
  CLICK: 'click',
};

const KakaoMap = () => {
  const kakaoMapRef = useRef<HTMLDivElement>(null);
  const { setKakaoMap, kakaoMapAddEventListener } = useKakaoMapContext();
  const kakaoMapOptions = useRecoilValue(kakaoMapOptionsState);
  const { moveToCurrentLocation, moveToCurrentLocationIsLoading, zoomIn, zoomOut } =
    useOperateKakaoMap();
  const { recommendRandomRestaurant, recommendRandomRestaurantIsLoading } =
    useRecommendRandomRestaurant();
  const { randomRestaurant } = useRandomRestaurantContext();

  // 카카오맵을 생성하고 생성된 맵 객체를 state로 저장.
  useEffect(() => {
    kakao.maps.load(() => {
      if (kakaoMapRef.current) {
        const {
          center: { lat, lng },
          level,
        } = kakaoMapOptions;
        const options: kakao.maps.MapOptions = {
          center: new kakao.maps.LatLng(lat, lng),
          level: level,
        };
        const createdKakaoMap = new kakao.maps.Map(kakaoMapRef.current, options);

        if (randomRestaurant.marker) {
          randomRestaurant.marker.setMap(createdKakaoMap);
          kakaoMapAddEventListener(
            randomRestaurant.marker,
            KAKAO_MARKER_EVENT_TYPE.CLICK,
            () => {
              console.log('marker');
            }
          );
        }

        setKakaoMap(createdKakaoMap);
      }
    });

    () => {
      // kakao.maps.event.removeListener();
    };
  }, [kakaoMapOptions, setKakaoMap, randomRestaurant, kakaoMapAddEventListener]);

  return (
    <Box position='relative' width='100%' height='100%'>
      <div
        ref={kakaoMapRef}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
      <VStack position='absolute' top='3rem' right='1rem'>
        <CurrentLocationButton
          isLoading={moveToCurrentLocationIsLoading}
          onClick={moveToCurrentLocation}
        />
        <ZoomInButton onClick={zoomIn} />
        <ZoomOutButton onClick={zoomOut} />
      </VStack>
      <RecommendRandomRestaurantButton
        isLoading={recommendRandomRestaurantIsLoading}
        onClick={recommendRandomRestaurant}
      />
    </Box>
  );
};

export default KakaoMap;
