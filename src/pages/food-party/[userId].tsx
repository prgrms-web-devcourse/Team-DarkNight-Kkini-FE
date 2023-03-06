import { Avatar, AvatarGroup, Flex, Heading, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import FoodPartyListSkeleton from 'components/FoodParty/FoodPartyListSkeleton';
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

const DUMMY_PARTY_LIST = [
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

const fetchMyFoodPartyList = () => {
  return new Promise<FoodParty[]>((resolve, reject) => {
    resolve(DUMMY_PARTY_LIST);
  });
};

const MyFoodPartyList = () => {
  const router = useRouter();

  // To Do: 현재 인원 실시간 업데이트를 위한 refetch 필요 by 승준
  const handleClickFoodPartyItem = (partyId: number) => {
    router.push(`/food-party/detail/${partyId}`);
  };

  const { data: myFoodPartyList, isLoading } = useQuery<FoodParty[]>({
    queryKey: ['myFoodPartyList'],
    queryFn: fetchMyFoodPartyList,
  });

  if (isLoading) return <FoodPartyListSkeleton foodPartyCount={4} />;

  return (
    <Flex flexDirection='column' padding='1rem'>
      <Heading paddingBottom='1rem'>너님의 밥모임 목록</Heading>
      <Flex flexDirection='column'>
        {/* To Do: 컴포넌트화 필요 by 승준 */}
        {myFoodPartyList?.map((party) => (
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

export default MyFoodPartyList;
