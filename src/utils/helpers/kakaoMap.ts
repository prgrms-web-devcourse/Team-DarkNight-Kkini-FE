export const kakaoMapHelpers = {
  panto: ({
    kakaoMap,
    latitude,
    longitude,
  }: {
    kakaoMap: kakao.maps.Map;
    latitude: number;
    longitude: number;
  }) => {
    kakaoMap.panTo(new kakao.maps.LatLng(latitude, longitude));
  },
  getCenter: (kakaoMap: kakao.maps.Map) => ({
    latitude: kakaoMap.getCenter().getLat(),
    longitude: kakaoMap.getCenter().getLng(),
  }),
  getLevel: (kakaoMap: kakao.maps.Map) => kakaoMap.getLevel(),
  setLevel: ({
    kakaoMap,
    nextLevel,
  }: {
    kakaoMap: kakao.maps.Map;
    nextLevel: number;
  }) => {
    kakaoMap.setLevel(nextLevel);
  },
};
