import { atom } from 'recoil';

type KaKaoMapOptions = {
  center: {
    lat: number;
    lng: number;
  };
  level: number;
};

const DEFAULT_LATITUDE = 37.497969;
const DEFAULT_LONGITUDE = 127.02759;
const DEFAULT_LEVEL = 5;

export const kakaoMap = atom<kakao.maps.Map | null>({
  key: 'kakaoMap',
  default: null,
});

export const kakaoMapOptionsState = atom<KaKaoMapOptions>({
  key: 'kakaoMapOptions',
  default: {
    center: {
      lat: DEFAULT_LATITUDE,
      lng: DEFAULT_LONGITUDE,
    },
    level: DEFAULT_LEVEL,
  },
});
