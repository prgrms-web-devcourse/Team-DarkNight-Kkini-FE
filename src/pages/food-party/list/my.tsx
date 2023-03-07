import { Flex, Heading } from '@chakra-ui/react';
import FoodPartyList from 'components/FoodParty/FoodPartyList';
import FoodPartyListSkeleton from 'components/FoodParty/FoodPartyListSkeleton';
import { useGetMyFoodPartyList } from 'hooks/query/useFoodParty';
import { useRouter } from 'next/router';

const MyFoodPartyList = () => {
  const router = useRouter();
  // To Do: 현재 인원 실시간 업데이트를 위한 refetch 필요 by 승준
  const { data, isLoading, error, isSuccess } = useGetMyFoodPartyList();
  const handleClickFoodPartyItem = (partyId: number) => {
    router.push(`/food-party/detail/${partyId}`);
  };

  if (isLoading) return <FoodPartyListSkeleton foodPartyCount={4} />;
  if (error) return <div>{error.toString()}</div>;

  return (
    <Flex flexDirection='column' padding='1rem'>
      <Heading paddingBottom='1rem'>너님의 밥모임 목록</Heading>
      <FoodPartyList
        foodPartyList={isSuccess ? data : []}
        onClick={handleClickFoodPartyItem}
      />
    </Flex>
  );
};

export default MyFoodPartyList;
