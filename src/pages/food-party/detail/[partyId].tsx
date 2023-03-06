import { Divider, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import Category from 'components/common/Category';
import FoodPartyMemberList from 'components/FoodParty/FoodPartyDetail/FoodPartyMemberList';
import { useRouter } from 'next/router';
import { AiOutlineCalendar, AiOutlineClockCircle } from 'react-icons/ai';
import { Member } from 'types/foodParty';

type Comment = {
  commentId: number;
  userId: number;
  userName: string;
  avatarUrl: string;
  createdAt: number[];
  updatedAt: number[];
  content: string;
};

type FoodPartyDetailType = {
  partyId: number;
  name: string;
  capacity: number;
  promiseTime: number[];
  categories: string[];
  members: Member[];
  comments: Comment[];
};

const DUMMY_PARTY = {
  partyId: 2,
  name: '라멘 뇸뇸뇸, 나가면 지상렬',
  capacity: 5,
  promiseTime: [2023, 3, 3, 13, 30, 0, 893316700],
  categories: ['QUIET', 'MANNERS MAKETH MAN'],
  members: [
    {
      userId: 1,
      userName: 'hello',
      avatarUrl: 'https://bit.ly/kent-c-dodds',
    },
    {
      userId: 2,
      userName: 'world',
      avatarUrl: 'https://bit.ly/prosper-baba',
    },
    {
      userId: 3,
      userName: 'developer',
      avatarUrl: 'https://bit.ly/code-beast',
    },
  ],
  comments: [
    {
      commentId: 19273,
      userId: 1,
      userName: 'hello',
      avatarUrl: 'https://bit.ly/kent-c-dodds',
      createdAt: [2023, 3, 3, 12, 10, 0, 893316700],
      updatedAt: [2023, 3, 3, 12, 10, 0, 893316700],
      content: '안녕하세요',
    },
    {
      commentId: 19274,
      userId: 2,
      userName: 'world',
      avatarUrl: 'https://bit.ly/prosper-baba',
      createdAt: [2023, 3, 3, 12, 12, 0, 893316700],
      updatedAt: [2023, 3, 3, 12, 12, 0, 893316700],
      content: '네, 하이요',
    },
    {
      commentId: 19275,
      userId: 1,
      userName: 'hello',
      avatarUrl: 'https://bit.ly/kent-c-dodds',
      createdAt: [2023, 3, 3, 12, 15, 0, 893316700],
      updatedAt: [2023, 3, 3, 12, 17, 0, 893316700],
      content: '반갑습니다!',
    },
  ],
};

const getFoodPartyDetail = () => {
  return new Promise<FoodPartyDetailType>((resolve, reject) => {
    resolve(DUMMY_PARTY);
  });
};

const FoodPartyDetail = () => {
  const router = useRouter();
  const partyId = router.query.partyId;

  // To Do: 404 처리 by 승준
  // partyId로 조회하는 페이지
  // 조회가 안되면 404 처리
  const {
    data: foodPartyDetail,
    isLoading,
    error,
  } = useQuery<FoodPartyDetailType>({
    queryKey: ['foodPartyDetail', partyId],
    queryFn: getFoodPartyDetail,
  });

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
