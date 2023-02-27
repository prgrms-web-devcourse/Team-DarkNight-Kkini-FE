import { atom } from 'recoil';

type KakaoMapOptions = {
  center: {
    lat: number;
    lng: number;
  };
  level: number;
};

const DEFAULT_LATITUDE = 37.497969;
const DEFAULT_LONGITUDE = 127.02759;
const DEFAULT_LEVEL = 5;

export const kakaoMapOptionsState = atom<KakaoMapOptions>({
  key: 'kakaoMapOptions',
  default: {
    center: {
      lat: DEFAULT_LATITUDE,
      lng: DEFAULT_LONGITUDE,
    },
    level: DEFAULT_LEVEL,
  },
});
