import { Flex, Heading } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import FoodPartyList from 'components/FoodParty/FoodPartyList';
import FoodPartyListSkeleton from 'components/FoodParty/FoodPartyListSkeleton';
import { useRouter } from 'next/router';
import { FoodParty } from 'types/foodParty';

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

  if (!myFoodPartyList || isLoading) return <FoodPartyListSkeleton foodPartyCount={4} />;

  return (
    <Flex flexDirection='column' padding='1rem'>
      <Heading paddingBottom='1rem'>너님의 밥모임 목록</Heading>
      <FoodPartyList foodPartyList={myFoodPartyList} onClick={handleClickFoodPartyItem} />
    </Flex>
  );
};

export default MyFoodPartyList;
