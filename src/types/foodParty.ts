import { RestaurantType } from './kakaoSearch';

type MemberRole = 'LEADER' | 'MEMBER' | 'BLOCKED';

export type FoodPartyStatus = '모집 중' | '모집 완료' | '식사 완료';

export type Member = {
  userId: number;
  userName: string;
  avatarUrl: string;
  role: MemberRole;
};

export type FoodParty = {
  id: number;
  name: string;
  currentMember: number;
  capacity: number;
  promiseTime: number[];
  status: FoodPartyStatus;
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
