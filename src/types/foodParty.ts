import { RestaurantType } from './kakaoSearch';
import { Restaurant } from './restaurant';

type CrewMemberRole = 'LEADER' | 'MEMBER' | 'BLOCKED';

export type FoodPartyStatus = '모집 중' | '모집 완료' | '식사 완료';

export type Member = {
  userId: number;
  nickname: string;
  profileImgUrl: string;
  crewMemberRole: CrewMemberRole;
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

export type FoodPartyDetail = { response: Restaurant } & FoodParty;

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

export type FoodPartyRevieweeType = {
  userId: number;
  nickname: string;
  profileImgUrl: string;
  crewMemberRole: string;
  isReviewed: boolean;
};

export type FoodPartyMemberReviewBody = {
  revieweeId: number;
  content: string;
  mannerScore: number;
};

export type FoodPartyLeaderReviewBody = {
  leaderId: number;
  content: string;
  mannerScore: number;
  tasteScore: number;
};
