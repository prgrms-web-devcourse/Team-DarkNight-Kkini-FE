import { Box, Flex, Heading, Text } from '@chakra-ui/react';
// import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

const DUMMY_PARTIES = [
  {
    id: 1,
    name: '햄최삼 모여라',
    capacity: 5,
    promiseTime: [2023, 3, 14, 17, 50, 59, 893316700],
    status: 'RECRUITING',
    content: '맥도날드 더쿼파치 뿌수러 갈 사람!',
    category: 'QUIET',
  },
  {
    id: 2,
    name: '라멘 뇸뇸뇸, 나가면 지상렬',
    capacity: 3,
    promiseTime: [2023, 3, 3, 13, 30, 0, 893316700],
    status: 'RECRUITING',
    content: '식사 예절 좋으신 분만',
    category: 'MANNERS MAKETH MAN',
  },
];

const MyFoodParties = () => {
  const router = useRouter();

  // To Do: 현재 인원 실시간 업데이트를 위한 refetch 필요 by 승준
  const handleClickFoodPartyItem = (partyId: number) => {
    router.push(`/food-party/detail/${partyId}`);
  };

  return (
    <Flex flexDirection='column'>
      <Heading marginLeft='1rem'>너님의 밥모임 목록</Heading>
      <Flex flexDirection='column' padding='1rem'>
        {/* To Do: 컴포넌트화 필요 by 승준 */}
        {DUMMY_PARTIES.map((party) => (
          <Flex
            onClick={() => {
              handleClickFoodPartyItem(party.id);
            }}
            alignItems='center'
            justifyContent='space-between'
            cursor='pointer'
            padding='1rem'
            boxShadow='button'
            borderRadius='1rem'
            border='1px solid #e2e5e6'
            marginBottom='1rem'
            key={party.id}>
            <Box>
              {/* To Do: ellipsis 처리 by 승준 */}
              <Text>{party.name}</Text>
              <Text>{party.content}</Text>
            </Box>
            <Box>/ {party.capacity}</Box>
            {/* To Do: Avatar Group 보여주기 by 승준 */}
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default MyFoodParties;

// To Do: 서버 사이드 렌더링 by 승준
// type ParamsType = {
//   userId: string;
// };

// type GetServerSidePropsReturnType = {
//   userId: string;
// };

// export const getServerSideProps: GetServerSideProps<
//   GetServerSidePropsReturnType,
//   ParamsType
// > = async ({ params }) => {
//   const { userId } = params!;
//   const foodParties = await getMyFoodParties('asd');

//   return {
//     props: {
//       userId,
//     },
//   };
// };
