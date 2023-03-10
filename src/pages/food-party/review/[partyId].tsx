import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import Button from 'components/common/Button';
import ReviewBottomDrawer from 'components/FoodParty/Review/ReviewBottomDrawer';
import { useGetUser } from 'hooks/query/useUser';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { fetchUser } from 'services/user';
import QUERY_KEYS from 'utils/constants/queryKeys';
const DUMMY_PARTY = {
  name: '라멘 뇸뇸뇸, 나가면 지상렬',
  capacity: 5,
  promiseTime: [2023, 3, 3, 13, 30, 0, 893316700],
  categories: ['QUIET', 'MANNERS MAKETH MAN'],
  members: [
    {
      userId: 1,
      userName: 'hello',
      avatarUrl: 'amklgaerg',
      type: 'LEADER',
    },
    {
      userId: 2,
      userName: 'world',
      avatarUrl: 'sdbfml',
      type: 'MEMBER',
    },
    {
      userId: 3,
      userName: 'developer',
      avatarUrl: 'gmklbia',
      type: 'MEMBER',
    },
  ],
};
const FoodPartyReviewPage = () => {
  const router = useRouter();
  const [selectedUserName, setSelectedUserName] = useState('');
  const [selectedUserRole, setSelectedUserRole] = useState('');
  const { members } = DUMMY_PARTY;
  const { isOpen, onOpen, onClose } = useDisclosure();
  /** ToDo. getServerSideProps로 리뷰정보, 멤버 정보 받아와서 처리하기 */

  const handleClickReviewButton = (name: string, type: string) => {
    setSelectedUserName(name);
    setSelectedUserRole(type);
    onOpen();
  };

  const handleClickGoBackToList = () => {
    router.push('/food-party/detail/1'); // partyId는 getServerSideProps 하면서 추가
  };

  return (
    <Flex bgColor='subBackground' h='100%' justify='center' align='center'>
      <Flex
        direction='column'
        position='relative'
        w='90%'
        h='95%'
        bgColor='white'
        borderRadius={8}
        p='2rem 1.2rem'>
        <Heading fontSize='2xl'>리뷰를 작성해주세요</Heading>
        <VStack pt='1rem'>
          {members.map(({ userId, userName, type }) => (
            <Flex
              key={userId}
              w='100%'
              h='4rem'
              borderRadius={8}
              border='1px solid #888'
              boxShadow='0px 0px 3px #888'
              p='0.25rem 1rem'
              align='center'>
              <Flex flex='1' h='100%' m='0' align='center' gap='1rem'>
                <Avatar src='favicon.ico' width='2rem' height='2rem' />
                <Flex direction='column' flex='1'>
                  <Text fontSize='lg' fontWeight={800}>
                    {userName}
                  </Text>
                  <Text
                    textAlign='left'
                    fontSize='0.75rem'
                    fontWeight={800}
                    color={type === 'LEADER' ? 'red.800' : 'green.500'}>
                    {type}
                  </Text>
                </Flex>
              </Flex>
              <Button
                width='auto'
                height='2rem'
                onClick={() => handleClickReviewButton(userName, type)}
                style={{
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  borderRadius: '0.5rem',
                  padding: '0.25rem 0.5rem',
                  color: 'white',
                  background: 'primary',
                }}>
                리뷰하러 가기
              </Button>
              <ReviewBottomDrawer
                isOpen={isOpen}
                onClose={onClose}
                selectedUserRole={selectedUserRole}
                selectedUserName={selectedUserName}
              />
            </Flex>
          ))}
        </VStack>
        <Button
          onClick={handleClickGoBackToList}
          width='80%'
          style={{
            position: 'absolute',
            left: '2.4rem',
            right: 0,
            bottom: '2rem',
            backgroundColor: 'white',
            border: '1px solid',
            borderColor: 'primary',
            color: 'primary',
          }}>
          &lt; 밥모임 목록으로 돌아가기
        </Button>
      </Flex>
    </Flex>
  );
};

export default FoodPartyReviewPage;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { partyId } = context.query;

//   // const queryClient = new QueryClient();
//   // await queryClient.prefetchQuery({
//   //   queryKey: [QUERY_KEYS.USER.MY_INFO],
//   //   queryFn: fetchUser,
//   // });

//   return {
//     props: {
//       partyId,
//       // dehydratedState: dehydrate(queryClient),
//     },
//   };
// };
