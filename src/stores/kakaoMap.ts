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

/**
 * kakaoMap 객체를 recoil로 저장하면 지도가 끌려가는 듯한 에러가 발생함.
 * useState를 통해 저장할 때는 별다른 문제가 발생 안함.
 */
// export const kakaoMapState = atom<kakao.maps.Map | null>({
//   key: 'kakaoMap',
//   default: null,
// });

/**
 * 여기서 kakao는 undefined가 된다. 브라우저 환경이 아니라서 그런 것 같다.
 */
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
