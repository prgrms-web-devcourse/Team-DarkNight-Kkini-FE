const ROUTING_PATHS = {
  HOME: '/',
  FOOD_PARTY: {
    CREATE: '/food-party/create',
    LIST: {
      MY: '/food-party/list/my',
      RESTAURANT: (placeId: string | number, placeName: string) =>
        `/food-party/list/restaurant/${placeId}?name=${placeName}`,
    },
    DETAIL: {
      INFORMATION: (partyId: string | number) => `/food-party/detail/${partyId}`,
      CHAT: (roomId: string | number) => `/food-party/detail/chat/${roomId}`,
    },
    REVIEW: (partyId: string | number) => `/food-party/review/${partyId}`,
  },
  USER: {
    PROFILE: (userId: string | number) => `/user/${userId}`,
    EDIT_PROFILE: 'user/edit',
  },
};

export default ROUTING_PATHS;
