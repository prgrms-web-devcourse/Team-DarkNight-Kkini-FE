import { RestaurantType } from './kakaoSearch';
import { Restaurant } from './restaurant';

type CrewMemberRole = 'LEADER' | 'MEMBER' | 'BLOCKED';

type MessageType = 'JOIN' | 'CHAT' | 'LEAVE';

export type ProposalStatus = '미신청' | '대기 중' | '승인' | '거절';

export type FoodPartyStatus = '모집 중' | '모집 종료' | '식사 완료';

export type FoodPartyDetailStatusButtonText =
  | '모집 완료할끼니?'
  | '식사를 완료했끼니?'
  | '참여할 끼니?'
  | '모집이 완료되버렸끼니!'
  | '인원이 꽉 차버렸끼니!'
  | '수락 대기 중'
  | '거절 당했어요...'
  | '';

export type Member = {
  userId: number;
  nickname: string;
  profileImgUrl: string;
  crewMemberRole: CrewMemberRole;
};

export type Message = {
  id: number;
  userId: number;
  username: string;
  profileImgUrl: string;
  type: MessageType;
  createdAt: number[];
  content: string;
  isFirstMessageOfThatDay?: boolean;
};

export type ReceivedMessage = {
  id: number;
  userId: number;
  username: string;
  profileImgUrl: string;
  type: MessageType;
  createdAt: string;
  content: string;
};

export type FoodParty = {
  id: number;
  name: string;
  currentMember: number;
  capacity: number;
  promiseTime: number[];
  crewStatus: FoodPartyStatus;
  content: string;
  category: string;
  members: Member[];
  proposalStatus: ProposalStatus;
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

export type NearFoodPartyItem = {
  latitude: number;
  longitude: number;
  storeId: number;
  placeName: string;
};

export type NearFoodPartyProps = {
  latitude: number;
  longitude: number;
  distance: number;
};
