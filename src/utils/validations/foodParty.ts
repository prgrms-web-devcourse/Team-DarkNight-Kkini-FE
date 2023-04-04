import { FoodPartyStatus } from 'types/foodParty';

export const validateAbleToKickOut = (isLeader: boolean, partyStatus: FoodPartyStatus) =>
  isLeader && partyStatus === '모집 중';

export const validateAbleToChat = (
  isLeader: boolean,
  isMember: boolean,
  callback: () => void
) => (isLeader || isMember ? callback : undefined);
