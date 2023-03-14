import { Box, VStack } from '@chakra-ui/react';
import useKakaoMapContext from 'contexts/kakaoMap';
import useRandomRestaurantContext from 'contexts/kakaoMap/randomRestaurant';
import useOperateKakaoMap from 'hooks/kakaoMap/useOperateKakaoMap';
import useRecommendRandomRestaurant from 'hooks/kakaoMap/useRecommendRandomRestaurant';
import useNearFoodParty from 'hooks/useNearFoodParty';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import {
  foodPartyCreateDrawerOpenState,
  randomRestaurantDrawerOpenState,
  restaurantDrawerOpenState,
} from 'stores/drawer';
import { kakaoMapOptionsState } from 'stores/kakaoMap';
import { DEFAULT_MAX_LEVEL, DEFAULT_MIN_LEVEL } from 'utils/constants/kakaoMap';
import ROUTING_PATHS from 'utils/constants/routingPaths';
import { getElement } from 'utils/helpers/elementHandler';
import { kakaoMapAddEventListener, kakaoMapHelpers } from 'utils/helpers/kakaoMap';

import RestaurantBottomDrawer from '../Restaurant/RestaurantBottomDrawer';
import CurrentLocationButton from './CurrentLocationButton';
import RecommendRandomRestaurantButton from './RecommendRandomRestaurantButton';
import ZoomInButton from './ZoomInButton';
import ZoomOutButton from './ZoomOutButton';

const KakaoMap = () => {
  const kakaoMapRef = useRef<HTMLDivElement>(null);
  const { kakaoMap, setKakaoMap } = useKakaoMapContext();
  const [foodPartyCreateDrawerOpen, setFoodPartyCreateDrawerOpen] = useRecoilState(
    foodPartyCreateDrawerOpenState
  );
  const [kakaoMapOptions, setKakaoMapOptions] = useRecoilState(kakaoMapOptionsState);
  const { moveToCurrentLocation, moveToCurrentLocationIsLoading, zoomIn, zoomOut } =
    useOperateKakaoMap();
  const { randomRestaurant, handleClickJoinToFoodPartyButton } =
    useRandomRestaurantContext();
  const currentPositionCustomOverlay = useRef<kakao.maps.CustomOverlay | null>(null);
  const router = useRouter();

  // 랜덤 맛집 드로어
  const [randomRestaurantDrawerOpen, setRandomRestaurantDrawerOpen] = useRecoilState(
    randomRestaurantDrawerOpenState
  );
  const { recommendRandomRestaurant, recommendRandomRestaurantIsLoading } =
    useRecommendRandomRestaurant();

  // 밥모임
  const { getNearFoodParty, clickedRestaurant } = useNearFoodParty();
  const [restaurantDrawerOpen, setRestaurantDrawerOpen] = useRecoilState(
    restaurantDrawerOpenState
  );

  const checkFoodPartyCreateDrawerIsOpened = () => {
    setFoodPartyCreateDrawerOpen(false);
  };

  // 카카오맵을 생성하고 생성된 맵 객체를 state로 저장, 초기 현재 위치 커스텀 오버레이 생성.
  useEffect(() => {
    kakao.maps.load(() => {
      if (!kakaoMapRef.current) return;

      const {
        center: { lat, lng },
        level,
      } = kakaoMapOptions;
      const options: kakao.maps.MapOptions = {
        center: new kakao.maps.LatLng(lat, lng),
        level: level,
      };
      const createdKakaoMap = new kakao.maps.Map(kakaoMapRef.current, options);
      currentPositionCustomOverlay.current = kakaoMapHelpers.makeCustomOverlay(
        lat,
        lng,
        `<div class="container">
          <div class="center"></div>
          <div class="circle"></div>
        </div>`
      );

      // 스크롤 줌/아웃 제한
      createdKakaoMap.setMinLevel(DEFAULT_MIN_LEVEL);
      createdKakaoMap.setMaxLevel(DEFAULT_MAX_LEVEL);

      // 밥모임 불러오기
      getNearFoodParty({
        latitude: lat,
        longitude: lng,
        distance: kakaoMapHelpers.getDistanceFromLongitude(createdKakaoMap),
      });

      currentPositionCustomOverlay.current.setMap(createdKakaoMap);
      setKakaoMap(createdKakaoMap);
    });
  }, []);

  // 카카오맵 현재 상태(level, 위치 등) 추적을 위한 event 등록
  useEffect(() => {
    kakao.maps.load(() => {
      if (!kakaoMap) return;

      kakaoMapAddEventListener(kakaoMap, 'click', () => {
        foodPartyCreateDrawerOpen && setFoodPartyCreateDrawerOpen(false);
      });

      kakaoMapAddEventListener(kakaoMap, 'zoom_changed', () => {
        checkFoodPartyCreateDrawerIsOpened();
        setKakaoMapOptions((previousKakaoMapOptions) => ({
          ...previousKakaoMapOptions,
          level: kakaoMapHelpers.getLevel(kakaoMap),
        }));

        const distance = kakaoMapHelpers.getDistanceFromLongitude(kakaoMap);
        const { latitude, longitude } = kakaoMapHelpers.getCenter(kakaoMap);
        getNearFoodParty({
          latitude,
          longitude,
          distance,
        });
      });

      kakaoMapAddEventListener(kakaoMap, 'center_changed', () => {
        checkFoodPartyCreateDrawerIsOpened();
        const { latitude, longitude } = kakaoMapHelpers.getCenter(kakaoMap);
        setKakaoMapOptions((previousKakaoMapOptions) => ({
          ...previousKakaoMapOptions,
          center: {
            lat: latitude,
            lng: longitude,
          },
        }));

        // 현재 위치 커스텀 오버레이가 존재하면 지운다. 그리고 변경된 위치에 현재 위치 커스텀 오버레이를 올린다.
        if (currentPositionCustomOverlay.current) {
          currentPositionCustomOverlay.current.setMap(null);
        }
        currentPositionCustomOverlay.current = kakaoMapHelpers.makeCustomOverlay(
          latitude,
          longitude,
          `<div class="container">
            <div class="center"></div>
            <div class="circle"></div>
          </div>`
        );
        currentPositionCustomOverlay.current.setMap(kakaoMap);
      });

      kakaoMapAddEventListener(kakaoMap, 'dragend', () => {
        const distance = kakaoMapHelpers.getDistanceFromLongitude(kakaoMap);
        const { latitude, longitude } = kakaoMapHelpers.getCenter(kakaoMap);
        getNearFoodParty({
          latitude,
          longitude,
          distance,
        });
      });
    });
  }, [kakaoMap, setKakaoMapOptions]);

  // 랜덤 맛집 커스텀 오버레이 생성 후 onClick 이벤트 달아주기
  useEffect(() => {
    if (!kakaoMap || !randomRestaurant.customOverlay) return;
    randomRestaurant.customOverlay.setMap(kakaoMap);

    // makeRandomRestaurantOverlayContent에서 custom overlay의 content를 string으로 생성했습니다.
    // 그러다보니 이렇게 찾아서 직접 다시 이벤트를 연결해줘야 페이지가 변경된 후 다시 돌아와도 클릭 이벤트가 제대로 작동하네요.
    const randomRestaurantCustomOverlayElement = getElement(
      '#random-restaurant-custom-overlay-container'
    );
    const handleClickRandomRestaurantCustomOverlay = () => {
      setRandomRestaurantDrawerOpen(true);
      kakaoMapHelpers.panto({
        kakaoMap,
        latitude: randomRestaurant.customOverlay?.getPosition().getLat(),
        longitude: randomRestaurant.customOverlay?.getPosition().getLng(),
      });
    };
    randomRestaurantCustomOverlayElement?.addEventListener(
      'click',
      handleClickRandomRestaurantCustomOverlay
    );

    return () => {
      if (randomRestaurant.customOverlay) {
        randomRestaurant.customOverlay.setMap(null);
        randomRestaurantCustomOverlayElement?.removeEventListener(
          'click',
          handleClickRandomRestaurantCustomOverlay
        );
      }
    };
  }, [kakaoMap, randomRestaurant]);

  useEffect(() => {
    if (!kakaoMap || !clickedRestaurant) return;

    setRestaurantDrawerOpen(true);
  }, [kakaoMap, clickedRestaurant]);

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
      {/* TODO: 아래 drawer 하나로 합치기 by 수화 */}
      <RestaurantBottomDrawer
        isOpen={randomRestaurantDrawerOpen}
        onClose={() => setRandomRestaurantDrawerOpen(false)}
        onClickJoinButton={handleClickJoinToFoodPartyButton}
        restaurant={randomRestaurant}
      />
      {clickedRestaurant && (
        <RestaurantBottomDrawer
          isOpen={restaurantDrawerOpen}
          onClose={() => setRestaurantDrawerOpen(false)}
          restaurant={clickedRestaurant}
          onClickJoinButton={() => {
            router.push(
              ROUTING_PATHS.FOOD_PARTY.LIST.RESTAURANT(
                clickedRestaurant.placeId,
                clickedRestaurant.placeName
              )
            );
          }}
        />
      )}
    </Box>
  );
};

export default KakaoMap;
