import { Box, VStack } from '@chakra-ui/react';
import useOperateKakaoMap from 'hooks/kakaoMap/useOperateKakaoMap';
import useRecommendRandomRestaurant from 'hooks/kakaoMap/useRecommendRandomRestaurant';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { kakaoMapOptionsState } from 'stores/kakaoMap';

import RecommendRandomRestaurantButton from '../Buttons/RecommendRandomRestaurantButton';
import CurrentLocationButton from './CurrentLocationButton';
import ZoomInButton from './ZoomInButton';
import ZoomOutButton from './ZoomOutButton';

const KakaoMap = () => {
  const kakaoMapRef = useRef<HTMLDivElement>(null);
  // recoil로 kakaoMap을 저장하면 에러 발생함... 원인을 모르겠음.
  // const [kakaoMap, setKakaoMap] = useRecoilState(kakaoMapState);
  const [kakaoMap, setKakaoMap] = useState<kakao.maps.Map>();
  const kakaoMapOptions = useRecoilValue(kakaoMapOptionsState);
  const { moveToCurrentLocation, moveToCurrentLocationIsLoading, zoomIn, zoomOut } =
    useOperateKakaoMap();
  const { recommendRandomRestaurant, recommendRandomRestaurantIsLoading } =
    useRecommendRandomRestaurant(kakaoMap);

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
        setKakaoMap(createdKakaoMap);
      }
    });
  }, [kakaoMapOptions]);

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
