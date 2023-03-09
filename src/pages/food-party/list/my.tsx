import { Flex, Heading } from '@chakra-ui/react';
import FoodPartyList from 'components/FoodParty/FoodPartyList';
import FoodPartyListSkeleton from 'components/FoodParty/FoodPartyListSkeleton';
import { useGetMyFoodPartyList } from 'hooks/query/useFoodParty';
import { useRouter } from 'next/router';
import ROUTING_PATHS from 'utils/constants/routingPaths';

const MyFoodPartyList = () => {
  const router = useRouter();
  // To Do: 현재 인원 실시간 업데이트를 위한 refetch 필요 by 승준
  const { data: myFoodPartyList, isLoading, error, isSuccess } = useGetMyFoodPartyList();
  const handleClickViewFoodPartyButton = (partyId: number) => {
    router.push(ROUTING_PATHS.FOOD_PARTY.DETAIL(partyId));
  };
  const handleClickReviewFoodPartyButton = (partyId: number) => {
    router.push(ROUTING_PATHS.FOOD_PARTY.REVIEW(partyId));
  };

  if (isLoading) return <FoodPartyListSkeleton foodPartyCount={2} />;
  if (error) return <div>{error.toString()}</div>;

  return (
    <Flex flexDirection='column' padding='1rem'>
      <Heading paddingBottom='1rem'>너님의 밥모임 목록</Heading>
      <FoodPartyList
        foodPartyList={isSuccess ? myFoodPartyList : []}
        onClickViewButton={handleClickViewFoodPartyButton}
        onClickReviewButton={handleClickReviewFoodPartyButton}
      />
    </Flex>
  );
};

export default MyFoodPartyList;
