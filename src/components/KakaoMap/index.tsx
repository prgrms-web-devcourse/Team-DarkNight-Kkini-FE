import { useEffect, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';

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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
        setMapOptions((prevMapOptions) => ({
          ...prevMapOptions,
          center: {
            lat: latitude,
            lng: longitude,
          },
        }));
      });
    }
  }, []);

  return (
    <Map
      center={mapOptions.center}
      isPanto={mapOptions.isPanto}
      style={{ width: '100%', height: '100%' }}
      level={mapOptions.level}
    />
  );
};

export default KakaoMap;
