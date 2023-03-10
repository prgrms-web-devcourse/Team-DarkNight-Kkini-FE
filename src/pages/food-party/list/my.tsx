import { Flex, Heading } from '@chakra-ui/react';
import GoHomeWhenErrorInvoked from 'components/common/GoHomeWhenErrorInvoked';
import FoodPartyList from 'components/FoodParty/FoodPartyList';
import FoodPartyListSkeleton from 'components/FoodParty/FoodPartyListSkeleton';
import { useGetMyFoodPartyList } from 'hooks/query/useFoodParty';
import { useRouter } from 'next/router';
import ROUTING_PATHS from 'utils/constants/routingPaths';

const MyFoodPartyList = () => {
  const router = useRouter();
  // To Do: 실시간 업데이트를 위한 refetch 필요 by 승준
  const { data: myFoodPartyList, isLoading, error, isSuccess } = useGetMyFoodPartyList();
  const handleClickViewFoodPartyButton = (partyId: number) => {
    router.push(ROUTING_PATHS.FOOD_PARTY.DETAIL.INFORMATION(partyId));
  };
  const handleClickReviewFoodPartyButton = (partyId: number) => {
    router.push(ROUTING_PATHS.FOOD_PARTY.REVIEW(partyId));
  };

  if (isLoading) return <FoodPartyListSkeleton foodPartyCount={2} />;
  if (error) return <div>{error.toString()}</div>;

  return (
    <>
      {isSuccess ? (
        <Flex flexDirection='column' padding='1rem'>
          <Heading paddingBottom='1rem'>나의 밥모임 목록</Heading>
          <FoodPartyList
            foodPartyList={myFoodPartyList}
            onClickViewButton={handleClickViewFoodPartyButton}
            onClickReviewButton={handleClickReviewFoodPartyButton}
          />
        </Flex>
      ) : (
        <GoHomeWhenErrorInvoked />
      )}
    </>
  );
};

export default MyFoodPartyList;
