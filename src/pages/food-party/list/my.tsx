import { Flex, Heading } from '@chakra-ui/react';
import { QueryClient } from '@tanstack/react-query';
import FoodPartyList from 'components/FoodParty/FoodPartyList';
import FoodPartyListSkeleton from 'components/FoodParty/FoodPartyListSkeleton';
import { useGetMyFoodPartyList } from 'hooks/query/useFoodParty';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

type MyFoodPartyListProps = {
  userId: number;
};

const MyFoodPartyList = ({ userId }: MyFoodPartyListProps) => {
  const router = useRouter();
  // To Do: 현재 인원 실시간 업데이트를 위한 refetch 필요 by 승준
  const { data: myFoodPartyList, isLoading } = useGetMyFoodPartyList(userId);
  const handleClickFoodPartyItem = (partyId: number) => {
    router.push(`/food-party/detail/${partyId}`);
  };

  if (!myFoodPartyList || isLoading) return <FoodPartyListSkeleton foodPartyCount={4} />;

  return (
    <Flex flexDirection='column' padding='1rem'>
      <Heading paddingBottom='1rem'>너님의 밥모임 목록</Heading>
      <FoodPartyList foodPartyList={myFoodPartyList} onClick={handleClickFoodPartyItem} />
    </Flex>
  );
};

export default MyFoodPartyList;

export const getServerSideProps: GetServerSideProps<{ userId: number }> = async ({
  params,
}) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([]);

  return {
    props: {
      userId: Number(params?.userId),
    },
  };
};
