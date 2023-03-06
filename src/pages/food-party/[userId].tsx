import {
  Avatar,
  AvatarGroup,
  Box,
  Flex,
  Heading,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Text,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

type FoodParty = {
  id: number;
  name: string;
  currentStaff: number;
  capacity: number;
  promiseTime: number[];
  status: string;
  content: string;
  category: string[];
  avatarUrls: string[];
};

const DUMMY_PARTIES = [
  {
    id: 1,
    name: '햄최삼 모여라',
    currentStaff: 2,
    capacity: 5,
    promiseTime: [2023, 3, 14, 17, 50, 59, 893316700],
    status: 'RECRUITING',
    content: '맥도날드 더쿼파치 뿌수러 갈 사람!',
    category: ['QUIET'],
    avatarUrls: ['https://bit.ly/ryan-florence', 'https://bit.ly/sage-adebayo'],
  },
  {
    id: 2,
    name: '라멘 뇸뇸뇸, 나가면 지상렬',
    currentStaff: 3,
    capacity: 3,
    promiseTime: [2023, 3, 3, 13, 30, 0, 893316700],
    status: 'RECRUITING',
    content: '식사 예절 좋으신 분만',
    category: ['MANNERS MAKETH MAN'],
    avatarUrls: [
      'https://bit.ly/kent-c-dodds',
      'https://bit.ly/prosper-baba',
      'https://bit.ly/code-beast',
    ],
  },
];

const getMyFoodParties = () => {
  return new Promise<FoodParty[]>((resolve, reject) => {
    resolve(DUMMY_PARTIES);
  });
};

const MyFoodParties = () => {
  const router = useRouter();

  // To Do: 현재 인원 실시간 업데이트를 위한 refetch 필요 by 승준
  const handleClickFoodPartyItem = (partyId: number) => {
    router.push(`/food-party/detail/${partyId}`);
  };

  const { data: myFoodParties, isLoading } = useQuery<FoodParty[]>({
    queryKey: ['my-food-parties'],
    queryFn: getMyFoodParties,
  });

  if (isLoading) return MyFoodPartiesSkeleton;

  return (
    <Flex flexDirection='column' padding='1rem'>
      <Heading paddingBottom='1rem'>너님의 밥모임 목록</Heading>
      <Flex flexDirection='column'>
        {/* To Do: 컴포넌트화 필요 by 승준 */}
        {myFoodParties?.map((party) => (
          <Flex
            onClick={() => {
              handleClickFoodPartyItem(party.id);
            }}
            alignItems='center'
            justifyContent='space-between'
            cursor='pointer'
            padding='1rem'
            borderRadius='1rem'
            border='1px solid #e2e5e6'
            marginBottom='1rem'
            key={party.id}>
            <Flex flexDirection='column'>
              {/* To Do: ellipsis 처리 by 승준 */}
              <Text>{party.name}</Text>
              <Text>{party.content}</Text>
            </Flex>
            <Flex flexDirection='column' alignItems='flex-end'>
              {party.currentStaff} / {party.capacity}
              <AvatarGroup size='xs' max={2}>
                {party.avatarUrls.map((avatarUrl) => (
                  <Avatar key={avatarUrl} src={avatarUrl} />
                ))}
              </AvatarGroup>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default MyFoodParties;

const MyFoodPartiesSkeleton = (
  <Flex flexDirection='column' padding='1rem'>
    <Skeleton marginBottom='1rem' borderRadius='0.5rem' height='4rem'></Skeleton>
    <Flex flexDirection='column'>
      {[
        'food-party-dummy-skeleton-1',
        'food-party-dummy-skeleton-2',
        'food-party-dummy-skeleton-3',
        'food-party-dummy-skeleton-4',
      ].map((key) => (
        <Flex
          key={key}
          alignItems='center'
          justifyContent='space-between'
          boxShadow='button'
          borderRadius='1rem'
          padding='1rem'
          marginBottom='1rem'
          border='1px solid #e2e5e6'>
          <Box width='60%'>
            <SkeletonText noOfLines={2} spacing='4' skeletonHeight='3' />
          </Box>
          <Flex alignItems='center'>
            <SkeletonCircle />
            <SkeletonCircle marginLeft='-0.5rem' />
            <SkeletonCircle marginLeft='-0.5rem' />
          </Flex>
        </Flex>
      ))}
    </Flex>
  </Flex>
);
