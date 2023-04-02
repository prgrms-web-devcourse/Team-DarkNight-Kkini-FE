import { atom } from 'recoil';

export const foodPartyMemberWillBeKickedOutState = atom<{
  nickname: string;
  memberId: number;
}>({
  key: 'foodPartyMemberWillBeKickedOut',
  default: {
    nickname: '',
    memberId: -1,
  },
});
