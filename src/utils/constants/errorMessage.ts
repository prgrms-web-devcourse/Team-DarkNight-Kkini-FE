const ERROR_MESSAGE = {
  CANNOT_GET_LOCATION_INFORMATION:
    '현재 브라우저 환경에서는 위치 정보를 얻을 수 없습니다.',
  CANNOT_GET_RANDOM_RESTAURANT_FROM_CURRENT_POSITION:
    '현재 위치에서는 랜덤 맛집 정보를 얻을 수 없습니다.',
  // https://apis.map.kakao.com/web/documentation/#services_Status
  // 위 문서 확인 시, ERROR 코드는 카카오맵 서버에 문제가 있을 시 발생함.
  REQUEST_FAILED_BY_KAKAO_MAP_SERVER_ERROR: '카카오맵 서버 에러로 요청이 실패했습니다.',
};

export default ERROR_MESSAGE;
