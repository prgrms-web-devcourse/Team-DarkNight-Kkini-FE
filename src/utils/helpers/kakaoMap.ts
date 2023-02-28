export const kakaoMapHelpers = {
  getCenter: (kakaoMap: kakao.maps.Map) => ({
    latitude: kakaoMap.getCenter().getLat(),
    longitude: kakaoMap.getCenter().getLng(),
  }),
};
