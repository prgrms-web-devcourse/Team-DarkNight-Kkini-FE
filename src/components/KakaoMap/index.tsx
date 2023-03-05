import { Box, useDisclosure, VStack } from '@chakra-ui/react';
import useKakaoMapContext from 'contexts/kakaoMap';
import useRandomRestaurantContext from 'contexts/kakaoMap/randomRestaurant';
import useOperateKakaoMap from 'hooks/kakaoMap/useOperateKakaoMap';
import useRecommendRandomRestaurant from 'hooks/kakaoMap/useRecommendRandomRestaurant';
import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { kakaoMapOptionsState } from 'stores/kakaoMap';
import { getElement } from 'utils/helpers/elementHandler';
import { kakaoMapAddEventListener, kakaoMapHelpers } from 'utils/helpers/kakaoMap';

import RecommendRandomRestaurantButton from '../common/Buttons/RecommendRandomRestaurantButton';
import CurrentLocationButton from './CurrentLocationButton';
import RandomRestaurantDrawer from './RandomRestaurantDrawer';
import ZoomInButton from './ZoomInButton';
import ZoomOutButton from './ZoomOutButton';

const KakaoMap = () => {
  const kakaoMapRef = useRef<HTMLDivElement>(null);
  const { kakaoMap, setKakaoMap } = useKakaoMapContext();
  const [kakaoMapOptions, setKakaoMapOptions] = useRecoilState(kakaoMapOptionsState);
  const { moveToCurrentLocation, moveToCurrentLocationIsLoading, zoomIn, zoomOut } =
    useOperateKakaoMap();
  const { randomRestaurant } = useRandomRestaurantContext();

  // 랜덤 맛집 드로어
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { recommendRandomRestaurant, recommendRandomRestaurantIsLoading } =
    useRecommendRandomRestaurant();

  // 카카오맵을 생성하고 생성된 맵 객체를 state로 저장.
  useEffect(() => {
    kakao.maps.load(() => {
      if (!kakaoMapRef.current) return;

      const {
        center: { lat, lng },
        level,
      } = kakaoMapOptions;
      const createdKakaoMap = new kakao.maps.Map(kakaoMapRef.current, {
        center: new kakao.maps.LatLng(lat, lng),
        level,
      });
      setKakaoMap(createdKakaoMap);
    });
  }, []);

  // 카카오맵 현재 상태(level, 위치 등) 추적을 위한 event 등록
  useEffect(() => {
    kakao.maps.load(() => {
      if (!kakaoMap) return;

      kakaoMapAddEventListener(kakaoMap, 'zoom_changed', () => {
        setKakaoMapOptions((previousKakaoMapOptions) => ({
          ...previousKakaoMapOptions,
          level: kakaoMapHelpers.getLevel(kakaoMap),
        }));
      });

      kakaoMapAddEventListener(kakaoMap, 'center_changed', () => {
        const { latitude, longitude } = kakaoMapHelpers.getCenter(kakaoMap);
        setKakaoMapOptions((previousKakaoMapOptions) => ({
          ...previousKakaoMapOptions,
          center: {
            lat: latitude,
            lng: longitude,
          },
        }));
      });
    });
  }, [kakaoMap, setKakaoMapOptions]);

  // 랜덤 맛집 커스텀 오버레이 생성 후 onClick 이벤트 달아주기
  useEffect(() => {
    if (!kakaoMap || !randomRestaurant.customOverlay) return;
    randomRestaurant.customOverlay.setMap(kakaoMap);

    // makeRandomRestaurantOverlayContent에서 custom overlay의 content를 string으로 생성했습니다.
    // 그러다보니 이렇게 찾아서 직접 다시 이벤트를 연결해줘야 페이지가 변경된 후 다시 돌아와도 클릭 이벤트가 제대로 작동하네요.
    const randomRetaurantCustomOverlayElement = getElement(
      '#random-restaurant-custom-overlay-container'
    );
    const handleClickRandomRestaurantCustomOverlay = () => {
      onOpen();
      kakaoMapHelpers.panto({
        kakaoMap,
        latitude: randomRestaurant.customOverlay?.getPosition().getLat(),
        longitude: randomRestaurant.customOverlay?.getPosition().getLng(),
      });
    };
    randomRetaurantCustomOverlayElement?.addEventListener(
      'click',
      handleClickRandomRestaurantCustomOverlay
    );

    return () => {
      if (randomRestaurant.customOverlay) {
        randomRestaurant.customOverlay.setMap(null);
        randomRetaurantCustomOverlayElement?.removeEventListener(
          'click',
          handleClickRandomRestaurantCustomOverlay
        );
      }
    };
  }, [kakaoMap, onOpen, randomRestaurant]);

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
      <RandomRestaurantDrawer
        isOpen={isOpen}
        onClose={onClose}
        randomRestaurant={randomRestaurant}
      />
    </Box>
  );
};

export default KakaoMap;
