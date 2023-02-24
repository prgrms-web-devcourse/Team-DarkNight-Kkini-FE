import styled from '@emotion/styled';
import { useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';

import CurrentLocationButton from './CurrentLocationButton';

/**
 * To Do
 * 초기 위치를 localStorage로부터 받아온다.
 * HTML5의 navigator.geolocation을 사용할 수 없을 때를 위한 예외 처리 필요
 */
const INIT_LATITUDE = 37.497969;
const INIT_LONGITUDE = 127.02759;
const INIT_MAP_LEVEL = 5;

const KakaoMap = () => {
  const [mapOptions, setMapOptions] = useState({
    center: { lat: INIT_LATITUDE, lng: INIT_LONGITUDE },
    level: INIT_MAP_LEVEL,
    isPanto: true,
  });

  const handleClickCurrentLocationButton = () => {
    const successCallback: PositionCallback = ({ coords: { latitude, longitude } }) => {
      setMapOptions((previousMapOptions) => ({
        ...previousMapOptions,
        center: {
          lat: latitude,
          lng: longitude,
        },
      }));
    };

    const errorCallback: PositionErrorCallback = (error) => {
      alert(error.message);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      // To Do
      // Toast UI로 대체 필요
      alert('현재 브라우저 환경에서는 위치 정보를 얻을 수 없습니다.');
    }
  };

  return (
    <Container>
      <Map
        center={mapOptions.center}
        isPanto={mapOptions.isPanto}
        style={{ width: '100%', height: '100%' }}
        level={mapOptions.level}
      />
      <CurrentLocationButton onClick={handleClickCurrentLocationButton} />
    </Container>
  );
};

export default KakaoMap;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
