import { RestaurantFromKeywordSearchProps } from './kakaoSearch';

type Member = {
  userId: number;
  avatarUrl: string;
};

export type FoodParty = {
  id: number;
  name: string;
  currentStaff: number;
  capacity: number;
  promiseTime: number[];
  status: string;
  content: string;
  category: string[];
  members: Member[];
};

export type PartyFormType = {
  name: string;
  category: string;
  capacity: number;
  promiseTime: string;
  content: string;
};

export type CreateFoodPartyBody = {
  createStoreRequest: RestaurantFromKeywordSearchProps;
} & PartyFormType;
