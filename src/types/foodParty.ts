import { RestaurantType } from './kakaoSearch';

export type Member = {
  userId: number;
  userName: string;
  avatarUrl: string;
  role: 'LEADER' | 'MEMBER' | 'BLOCKED';
};

export type FoodParty = {
  id: number;
  name: string;
  currentMember: number;
  capacity: number;
  promiseTime: number[];
  status: '모집 중' | '모집 완료' | '식사 완료';
  content: string;
  category: string;
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
