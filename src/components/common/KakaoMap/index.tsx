import { Box, VStack } from '@chakra-ui/react';
import useKakaoMapContext from 'contexts/kakaoMap';
import useKakaoMapMarkerContext from 'contexts/kakaoMapMarker';
import useOperateKakaoMap from 'hooks/kakaoMap/useOperateKakaoMap';
import useRecommendRandomRestaurant from 'hooks/kakaoMap/useRecommendRandomRestaurant';
import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { kakaoMapOptionsState } from 'stores/kakaoMap';

import RecommendRandomRestaurantButton from '../Buttons/RecommendRandomRestaurantButton';
import CurrentLocationButton from './CurrentLocationButton';
import ZoomInButton from './ZoomInButton';
import ZoomOutButton from './ZoomOutButton';

const KakaoMap = () => {
  const kakaoMapRef = useRef<HTMLDivElement>(null);
  const { setKakaoMap } = useKakaoMapContext();
  const kakaoMapOptions = useRecoilValue(kakaoMapOptionsState);
  const { moveToCurrentLocation, moveToCurrentLocationIsLoading, zoomIn, zoomOut } =
    useOperateKakaoMap();
  const { recommendRandomRestaurant, recommendRandomRestaurantIsLoading } =
    useRecommendRandomRestaurant();
  const { kakaoMapMarker } = useKakaoMapMarkerContext();

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

        if (kakaoMapMarker) kakaoMapMarker.setMap(createdKakaoMap);

        setKakaoMap(createdKakaoMap);
      }
    });
  }, [kakaoMapOptions, setKakaoMap, kakaoMapMarker]);

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
