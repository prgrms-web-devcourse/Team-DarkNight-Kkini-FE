import { RestaurantType } from './kakaoSearch';

export type Member = {
  userId: number;
  userName: string;
  avatarUrl: string;
  role: string;
};

export type FoodParty = {
  id: number;
  name: string;
  currentMember: number;
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

export type FoodPartyCreateBody = {
  createStoreRequest: {
    photoUrls: string;
  } & RestaurantType;
} & PartyFormType;
