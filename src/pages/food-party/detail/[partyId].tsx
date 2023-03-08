import { Divider, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import Button from 'components/common/Button';
import Category from 'components/common/Category';
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
    error,
  } = useGetFoodPartyDetail(partyId, userInformation?.id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.toString()}</div>;

  const [year, month, day, hour, minute] = foodPartyDetail!.promiseTime;

  return (
    <Flex flexDirection='column' padding='1rem' gap='0.5rem'>
      <Stack direction='row'>
        {isSuccess && <Category>{foodPartyDetail.category}</Category>}
      </Stack>
      {isSuccess && <Heading as='h1'>{foodPartyDetail.name}</Heading>}
      <Divider />
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
      {/* To Do: 아직 백엔드 API에서 memberList를 못 던짐. */}
      <FoodPartyMemberList
        memberList={isSuccess ? foodPartyDetail.members : []}
        capacity={isSuccess ? foodPartyDetail.capacity : 0}
      />
      {/* To Do */}
      {/* Leader이면 -> 모집 중, 모집 완료, 식사 완료, 인원 다 찼을 때 */}
      {/* member이면 -> 모집 중, 모집 완료, 식사 완료, 인원 다 찼을 때 */}
      {/* 참여하지 않았으면 -> 모집중, 모집 완료, 식사 완료, 인원 다 찼을 때 */}

      {/* 방장이라면 */}
      {/* {isSuccess && } */}

      {/* {isLeader && <Button>출발할 끼니?</Button>}
      <Button>참여할 끼니?</Button> */}
    </Flex>
  );
};

export default FoodPartyDetail;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { partyId } = context.query;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.FOOD_PARTY.FOOD_PARTY_DETAIL, partyId],
    queryFn: () => fetchFoodPartyDetail(partyId as string),
  });
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.USER.MY_INFO],
    queryFn: () => fetchUser(),
  });

  return {
    props: {
      partyId,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
