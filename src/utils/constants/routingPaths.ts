const ROUTING_PATHS = {
  HOME: '/',
  FOOD_PARTY: {
    CREATE: '/food-party/create',
    LIST: {
      MY: '/food-party/list/my',
      RESTAURANT: (placeId: string | number, placeName: string) =>
        `/food-party/list/restaurant/${placeId}?name=${placeName}`,
    },
    DETAIL: (partyId: string | number) => `/food-party/detail/${partyId}`,
  },
};

export default ROUTING_PATHS;
