import {
  FoodPartyDetailStatusButtonText,
  FoodPartyStatus,
  NearFoodPartyItem,
  ProposalStatus,
} from 'types/foodParty';
import { DocumentsType } from 'types/kakaoSearch';

export const getPhotoUrlsStringFromDocuments = (documents: DocumentsType[]) => {
  return getPhotoUrlsString(documents.map(({ image_url: imageUrl }) => imageUrl));
};

export const getPhotoUrlsString = (photoUrls: string[]) => {
  return photoUrls.join(',');
};

export const getPhotoUrlsArray = (photoUrls: string) => {
  if (!photoUrls) return [];

  return photoUrls.split(',');
};

export const getCategoryArray = (category: string) => {
  return category.split('>').map((category) => category.trim());
};

export const templatePromiseDate = (year: number, month: number, day: number) => {
  return `${year}년 ${month}월 ${day}일`;
};

export const templatePromiseTime = (hour: number, minute: number) => {
  return `${hour}:${String(minute).padStart(2, '0')}`;
};

export const getFoodPartyDetailStatusButtonText = (
  applied: ProposalStatus,
  isLeader: boolean,
  isMember: boolean,
  isFull: boolean,
  status: FoodPartyStatus
): FoodPartyDetailStatusButtonText => {
  // 방장인 경우
  if (isLeader) return LeaderText[status];

  // 멤버인 경우
  if (isMember) return MemberText[status];

  // 참여하지 않은 경우
  if (applied === '거절') return '거절 당했어요...';
  if (applied === '대기 중') return '수락 대기 중';
  if (isFull) return '인원이 꽉 차버렸끼니!';
  return NotMemberText[status];
};

export const checkButtonTextIsDisabled = (
  buttonText: FoodPartyDetailStatusButtonText
) => {
  return (
    buttonText === '인원이 꽉 차버렸끼니!' ||
    buttonText === '모집이 완료되버렸끼니!' ||
    buttonText === '수락 대기 중' ||
    buttonText === '거절 당했어요...'
  );
};

const LeaderText: {
  [key: string]: FoodPartyDetailStatusButtonText;
} = {
  '모집 중': '모집 완료할끼니?',
  '모집 종료': '식사를 완료했끼니?',
  '식사 완료': '',
};

const MemberText: {
  [key: string]: FoodPartyDetailStatusButtonText;
} = {
  '모집 중': '',
  '모집 종료': '',
  '식사 완료': '',
};

const NotMemberText: {
  [key: string]: FoodPartyDetailStatusButtonText;
} = {
  '모집 중': '참여할 끼니?',
  '모집 종료': '모집이 완료되버렸끼니!',
  '식사 완료': '',
};

export const getUniqueRestaurant = (foodParty: NearFoodPartyItem[]) => {
  return foodParty.filter(
    ({ storeId }, index, array) =>
      index === array.findIndex((item) => item.storeId === storeId)
  );
};
