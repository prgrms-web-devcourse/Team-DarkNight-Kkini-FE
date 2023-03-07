import { Divider, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import Category from 'components/common/Category';
import FoodPartyMemberList from 'components/FoodParty/FoodPartyDetail/FoodPartyMemberList';
import { useGetFoodPartyDetail } from 'hooks/query/useFoodParty';
import { useRouter } from 'next/router';
import { AiOutlineCalendar, AiOutlineClockCircle } from 'react-icons/ai';

// To Do: 404 처리 by 승준
// partyId로 조회하는 페이지
// 조회가 안되면 404 처리
const FoodPartyDetail = () => {
  const router = useRouter();
  // To Do: partyId를 서버 사이드 렌더링으로 넣어줘서 undefined를 없애주자. by 승준
  const partyId = router.query.partyId;
  const { data: foodPartyDetail, isLoading, error } = useGetFoodPartyDetail(partyId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.toString()}</div>;

  const [year, month, day, hour, minute] = foodPartyDetail!.promiseTime;

  return (
    <Flex flexDirection='column' padding='1rem' gap='0.5rem'>
      <Stack direction='row'>
        {foodPartyDetail?.categories.map((category) => (
          <Category key={category}>{category}</Category>
        ))}
      </Stack>
      <Heading as='h1'>{foodPartyDetail?.name}</Heading>
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
          {hour}:{minute}
        </Text>
      </Flex>
      <FoodPartyMemberList
        memberList={foodPartyDetail!.members}
        capacity={foodPartyDetail!.capacity}
      />
    </Flex>
  );
};

export default FoodPartyDetail;

// To Do: 스켈레톤 UI by 승준
// To Do: Server-Side Rendering
