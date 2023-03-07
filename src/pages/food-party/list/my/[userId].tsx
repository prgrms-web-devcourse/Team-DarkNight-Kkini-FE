import { Flex, Heading } from '@chakra-ui/react';
import FoodPartyList from 'components/FoodParty/FoodPartyList';
import FoodPartyListSkeleton from 'components/FoodParty/FoodPartyListSkeleton';
import { useGetMyFoodPartyList } from 'hooks/query/useFoodParty';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

type MyFoodPartyListProps = {
  userId: number;
};

const MyFoodPartyList = ({ userId }: MyFoodPartyListProps) => {
  console.log(userId);
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

// useRouter를 사용하면 userId가 undefined가 찍힐 수 있음.
// 따라서 userId를 곧바로 useGetMyFoodPartyList로 넣어주기 위해 getServerSideprops 이용.(undefined가 안되도록)
// 그래서 따로 await할 로직이 필요 없어 eslint-disable 처리.
// 하지만 getServerSideProps는 async 해줘야 제대로 처리됨.
export const getServerSideProps: GetServerSideProps<{ userId: number }> = async ({
  params,
  // eslint-disable-next-line @typescript-eslint/require-await
}) => {
  return {
    props: {
      userId: Number(params?.userId),
    },
  };
};
