import { useGetMyFoodPartyList } from 'hooks/query/useFoodParty';
import { useRouter } from 'next/router';
import ROUTING_PATHS from 'utils/constants/routingPaths';

import FoodPartyList from './FoodPartyList';

const MyFoodPartyList = () => {
  const router = useRouter();
  const { data: myFoodPartyList, isSuccess } = useGetMyFoodPartyList();
  const handleClickViewFoodPartyButton = (partyId: number) => {
    router.push(ROUTING_PATHS.FOOD_PARTY.DETAIL.INFORMATION(partyId));
  };
  const handleClickReviewFoodPartyButton = (partyId: number, partyName: string) => {
    router.push(ROUTING_PATHS.FOOD_PARTY.REVIEW(partyId, partyName));
  };

  if (!isSuccess) return null;
  return (
    <FoodPartyList
      isMyFoodParty
      foodPartyList={myFoodPartyList}
      onClickViewButton={handleClickViewFoodPartyButton}
      onClickReviewButton={handleClickReviewFoodPartyButton}
    />
  );
};

export default MyFoodPartyList;
