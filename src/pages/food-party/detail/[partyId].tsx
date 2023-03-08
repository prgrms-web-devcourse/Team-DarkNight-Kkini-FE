import { Divider, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import Category from 'components/common/Category';
import FoodPartyDetailMainButton from 'components/FoodParty/FoodPartyDetail/FoodPartyDetailMainButton';
import FoodPartyMemberList from 'components/FoodParty/FoodPartyDetail/FoodPartyMemberList';
import { useGetFoodPartyDetail } from 'hooks/query/useFoodParty';
import { useGetUser } from 'hooks/query/useUser';
import { GetServerSideProps } from 'next';
import { AiOutlineCalendar, AiOutlineClockCircle } from 'react-icons/ai';
import { fetchFoodPartyDetail } from 'services/foodParty';
import { fetchUser } from 'services/user';
import QUERY_KEYS from 'utils/constants/queryKeys';

// To Do: 404 처리 by 승준
// partyId로 조회하는 페이지
// 조회가 안되면 404 처리
const FoodPartyDetail = ({ partyId }: { partyId: string }) => {
  const { data: userInformation } = useGetUser();
  const {
    data: foodPartyDetail,
    isLoading,
    isSuccess,
    isLeader,
    isMember,
    isFull,
    error,
  } = useGetFoodPartyDetail(partyId, userInformation?.id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.toString()}</div>;

  // To Do: Date 등 따로 컴포넌트를 빼자.
  const [year, month, day, hour, minute] = foodPartyDetail!.promiseTime;

  // To Do: isLeader, isMember, isFull, status에 따라 다르게
  // const router = useRouter();
  // const handleClickButton = () => {
  //  router.push
  // }

  return (
    <Flex
      position='relative'
      height='100%'
      flexDirection='column'
      padding='1rem'
      gap='0.5rem'>
      {/* 헤더 */}
      <Flex flexDirection='column' gap='0.5rem'>
        <Stack direction='row'>
          {isSuccess && <Category>{foodPartyDetail.status}</Category>}
          {isSuccess && <Category>{foodPartyDetail.category}</Category>}
        </Stack>
        {isSuccess && <Heading as='h1'>{foodPartyDetail.name}</Heading>}
        <Divider />
      </Flex>
      {/* 데이트 */}
      <Flex flexDirection='column' gap='0.5rem'>
        <Flex alignItems='center' gap='0.5rem'>
          <AiOutlineCalendar />
          <Text>
            {year}년 {month}월 {day}일
          </Text>
        </Flex>
        <Flex alignItems='center' gap='0.5rem'>
          <AiOutlineClockCircle />
          <Text>
            {hour}:{String(minute).padStart(2, '0')}
          </Text>
        </Flex>
      </Flex>
      {/* 내용 */}
      {isSuccess && <Text>{foodPartyDetail.content}</Text>}
      {/* To Do: 아직 백엔드 API에서 memberList를 못 던짐. */}
      <FoodPartyMemberList
        memberList={isSuccess ? foodPartyDetail.members : []}
        capacity={isSuccess ? foodPartyDetail.capacity : 0}
      />
      {isSuccess && (
        <FoodPartyDetailMainButton
          isLeader={isLeader}
          isMember={isMember}
          isFull={isFull}
          // onClick={handleClickButton}
          status={foodPartyDetail.status}></FoodPartyDetailMainButton>
      )}
    </Flex>
  );
};

export default FoodPartyDetail;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { partyId } = context.query;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.USER.MY_INFO],
    queryFn: () => fetchUser(),
  });
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.FOOD_PARTY.FOOD_PARTY_DETAIL, partyId],
    queryFn: () => fetchFoodPartyDetail(partyId as string),
  });

  return {
    props: {
      partyId,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
