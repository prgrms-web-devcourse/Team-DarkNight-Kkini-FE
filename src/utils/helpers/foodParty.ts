import { FoodPartyDetailChangeStatusButtonText, FoodPartyStatus } from 'types/foodParty';
import { DocumentsType } from 'types/kakaoSearch';

export const getPhotoUrlsStringFromDocuments = (documents: DocumentsType[]) => {
  return getPhotoUrlsString(documents.map(({ image_url: imageUrl }) => imageUrl));
};

export const getPhotoUrlsString = (photoUrls: string[]) => {
  return photoUrls.join(',');
};

export const getPhotoUrlsArray = (photoUrls: string) => {
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

export const getFoodPartyDetailChangeStatusButtonText = (
  isLeader: boolean,
  isMember: boolean,
  isFull: boolean,
  status: FoodPartyStatus
): FoodPartyDetailChangeStatusButtonText => {
  // 방장인 경우
  if (isLeader) return LeaderText[status];

  // 멤버인 경우
  if (isMember) return MemberText[status];

  // 참여하지 않은 경우
  if (isFull) return '인원이 꽉 차버렸끼니!';
  return NotMemberText[status];
};

export const checkButtonTextIsDisabled = (
  buttonText: FoodPartyDetailChangeStatusButtonText
) => {
  return (
    buttonText === '인원이 꽉 차버렸끼니!' || buttonText === '모집이 완료되버렸끼니!'
  );
};

// getFoodPartyDetailChangeStatusButtonText, checkButtonTextIsDisabled에 사용되는 상수들
const LeaderText: {
  [key: string]: FoodPartyDetailChangeStatusButtonText;
} = {
  '모집 중': '모집 완료할끼니?',
  '모집 종료': '식사를 완료했끼니?',
  '식사 완료': '',
};

const MemberText: {
  [key: string]: FoodPartyDetailChangeStatusButtonText;
} = {
  '모집 중': '',
  '모집 종료': '',
  '식사 완료': '',
};

const NotMemberText: {
  [key: string]: FoodPartyDetailChangeStatusButtonText;
} = {
  '모집 중': '참여할 끼니?',
  '모집 종료': '모집이 완료되버렸끼니!',
  '식사 완료': '',
};
