const ROUTING_PATHS = {
  HOME: '/',
  FOOD_PARTY: {
    CREATE: '/food-party/create',
    LIST: {
      MY: '/food-party/list/my',
      RESTAURANT: (placeId: string | number, placeName: string) =>
        `/food-party/list/restaurant/${placeId}?restaurantName=${placeName}`,
    },
    DETAIL: {
      INFORMATION: (partyId: string | number) => `/food-party/detail/${partyId}`,
      CHAT: (roomId: string | number) => `/food-party/detail/chat/${roomId}`,
    },
    REVIEW: (partyId: string | number, partyName: string) =>
      `/food-party/review/${partyId}?partyName=${partyName}`,
  },
  USER: {
    PROFILE: (userId: string | number) => `/user/${userId}`,
    EDIT_PROFILE: '/user/edit',
  },
  APPLICATION: '/food-party/application',
};

export default ROUTING_PATHS;
