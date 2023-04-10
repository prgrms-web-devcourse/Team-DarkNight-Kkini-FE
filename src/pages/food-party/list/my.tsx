import { Flex, Heading } from '@chakra-ui/react';
import GoHomeWhenErrorInvoked from 'components/common/GoHomeWhenErrorInvoked';
import FoodPartyList from 'components/FoodParty/FoodPartyList';
import FoodPartyListSkeleton from 'components/FoodParty/FoodPartyListSkeleton';
import { useGetMyFoodPartyList } from 'hooks/query/useFoodParty';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ROUTING_PATHS from 'utils/constants/routingPaths';

const MyFoodPartyList = () => {
  const router = useRouter();
  // To Do: 실시간 업데이트를 위한 refetch 필요 by 승준
  const { data: myFoodPartyList, isLoading, error, isSuccess } = useGetMyFoodPartyList();
  const handleClickViewFoodPartyButton = (partyId: number) => {
    router.push(ROUTING_PATHS.FOOD_PARTY.DETAIL.INFORMATION(partyId));
  };
  const handleClickReviewFoodPartyButton = (partyId: number, partyName: string) => {
    router.push(ROUTING_PATHS.FOOD_PARTY.REVIEW(partyId, partyName));
  };

  if (isLoading) return <FoodPartyListSkeleton foodPartyCount={2} />;
  if (error) return <GoHomeWhenErrorInvoked />;

  return (
    <>
      <Head>
        <title>내가 참여한 밥모임 목록</title>
      </Head>
      {isSuccess ? (
        <Flex flexDirection='column' padding='1rem'>
          <Heading paddingBottom='1rem'>나의 밥모임 목록</Heading>
          <FoodPartyList
            isMyFoodParty
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
