const QUERY_KEYS = {
  USER: {
    MY_INFO: 'myInfo',
    USER_INFO: 'userInfo',
  },
  FOOD_PARTY: {
    MY_FOOD_PARTY_LIST: 'myFoodPartyList',
    FOOD_PARTY_DETAIL: 'foodPartyDetail',
    SEARCHED_FOOD_PARTY_LIST: 'searchedFoodPartyList',
    FOOD_PARTY_REVIEWEES: 'foodPartyReviewees',
    CHAT_MESSAGE_LIST: 'foodPartyMessageList',
  },
  RESTAURANT: {
    RESTAURANT_INFORMATION: 'restaurantInformation',
  },
} as const;

export default QUERY_KEYS;
