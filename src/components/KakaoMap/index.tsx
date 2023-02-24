import { useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';

const INIT_LATITUDE = 37.497969;
const INIT_LONGITUDE = 127.02759;
const INIT_MAP_LEVEL = 7;

const KakaoMap = () => {
  const [mapOptions, setMapOptions] = useState({
    center: { lat: INIT_LATITUDE, lng: INIT_LONGITUDE },
  });

  return (
    <Map
      center={mapOptions.center}
      style={{ width: '100%', height: '100%' }}
      level={INIT_MAP_LEVEL}
    />
  );
};

export default KakaoMap;
