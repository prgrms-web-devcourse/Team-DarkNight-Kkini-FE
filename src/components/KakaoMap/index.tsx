import { Box, VStack } from '@chakra-ui/react';
import useKakaoMapContext from 'contexts/kakaoMap';
import useRandomRestaurantContext from 'contexts/kakaoMap/randomRestaurant';
import useOperateKakaoMap from 'hooks/kakaoMap/useOperateKakaoMap';
import useRecommendRandomRestaurant from 'hooks/kakaoMap/useRecommendRandomRestaurant';
import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { kakaoMapOptionsState } from 'stores/kakaoMap';
import { kakaoMapAddEventListener, kakaoMapHelpers } from 'utils/helpers/kakaoMap';

import RecommendRandomRestaurantButton from '../common/Buttons/RecommendRandomRestaurantButton';
import CurrentLocationButton from './CurrentLocationButton';
import RandomRestaurantModal from './RandomRestaurantModal';
import ZoomInButton from './ZoomInButton';
import ZoomOutButton from './ZoomOutButton';

const KakaoMap = () => {
  const kakaoMapRef = useRef<HTMLDivElement>(null);
  const { kakaoMap, setKakaoMap } = useKakaoMapContext();
  const [kakaoMapOptions, setKakaoMapOptions] = useRecoilState(kakaoMapOptionsState);
  const { moveToCurrentLocation, moveToCurrentLocationIsLoading, zoomIn, zoomOut } =
    useOperateKakaoMap();
  const { recommendRandomRestaurant, recommendRandomRestaurantIsLoading } =
    useRecommendRandomRestaurant();
  const {
    randomRestaurant,
    randomRestaurantModalOpen,
    handleCloseRandomRestaurantModal,
    randomRestaurantModalRef,
  } = useRandomRestaurantContext();

  // 카카오맵을 생성하고 생성된 맵 객체를 state로 저장.
  useEffect(() => {
    kakao.maps.load(() => {
      if (kakaoMap || !kakaoMapRef.current) return;

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

      // 카카오맵의 상태(level, 위치 등)를 실시간 추적하기 위한 event 등록
      kakaoMapAddEventListener(createdKakaoMap, 'zoom_changed', () => {
        setKakaoMapOptions((previousKakaoMapOptions) => ({
          ...previousKakaoMapOptions,
          level: kakaoMapHelpers.getLevel(createdKakaoMap),
        }));
      });

      kakaoMapAddEventListener(createdKakaoMap, 'center_changed', () => {
        const { latitude, longitude } = kakaoMapHelpers.getCenter(createdKakaoMap);
        setKakaoMapOptions((previousKakaoMapOptions) => ({
          ...previousKakaoMapOptions,
          center: {
            lat: latitude,
            lng: longitude,
          },
        }));
      });
    });
  }, [kakaoMap, kakaoMapOptions, setKakaoMap, setKakaoMapOptions]);

  // 랜덤 맛집 커스텀 오버레이 생성
  useEffect(() => {
    if (!kakaoMap || !randomRestaurant.customOverlay) return;
    randomRestaurant.customOverlay.setMap(kakaoMap);

    return () => {
      if (randomRestaurant.customOverlay) {
        randomRestaurant.customOverlay.setMap(null);
      }
    };
  }, [kakaoMap, randomRestaurant]);

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
        onClick={() => {
          recommendRandomRestaurant();
        }}
      />

      <RandomRestaurantModal
        ref={randomRestaurantModalRef}
        isOpen={randomRestaurantModalOpen}
        onClose={handleCloseRandomRestaurantModal}
        randomRestaurant={randomRestaurant}
      />
    </Box>
  );
};

export default KakaoMap;
