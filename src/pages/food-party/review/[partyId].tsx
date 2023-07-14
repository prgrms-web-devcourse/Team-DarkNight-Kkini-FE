import { Avatar, Flex, Heading, Text, useDisclosure, VStack } from '@chakra-ui/react';
import Button from 'components/common/Button';
import GoHomeWhenErrorInvoked from 'components/common/GoHomeWhenErrorInvoked';
import ReviewBottomDrawer from 'components/FoodParty/Review/ReviewBottomDrawer';
import { useGetFoodPartyReviewees } from 'hooks/query/useFoodParty';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

const FoodPartyReviewPage = () => {
  const router = useRouter();
  const { partyId, partyName } = router.query as {
    partyId: string;
    partyName: string;
  };
  const [selectedUserName, setSelectedUserName] = useState('');
  const [selectedUserRole, setSelectedUserRole] = useState('');
  const [selectedUserId, setsSelectedUserId] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    data: myRevieweeList,
    isLoading,
    error,
    isSuccess,
  } = useGetFoodPartyReviewees(partyId);

  if (isLoading) return <div></div>;
  if (error) return <GoHomeWhenErrorInvoked />;

  const members = myRevieweeList ? myRevieweeList.filter((member) => member.userId) : [];

  const handleClickReviewButton = (name: string, role: string, userId: number) => {
    setSelectedUserName(name);
    setSelectedUserRole(role);
    setsSelectedUserId(userId);
    onOpen();
  };

  const handleClickGoBackToList = () => {
    router.push('/food-party/list/my');
  };

  return (
    <>
      <Head>
        <title>{partyName} - 밥모임 리뷰하기</title>
      </Head>
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
            {isSuccess &&
              members.map(
                ({ userId, nickname, crewMemberRole, profileImgUrl, isReviewed }) => (
                  <Flex
                    key={userId}
                    w='100%'
                    h='4rem'
                    borderRadius={8}
                    border='1px solid #e2e5e6'
                    p='0.25rem 1rem'
                    align='center'>
                    <Flex flex='1' h='100%' m='0' align='center' gap='1rem'>
                      <Avatar
                        src={profileImgUrl}
                        width='2rem'
                        height='2rem'
                        name={`${nickname} 아바타 사진`}
                      />
                      <Flex direction='column' flex='1'>
                        <Text fontSize='lg' fontWeight={800} noOfLines={1}>
                          {nickname}
                        </Text>
                        <Text
                          textAlign='left'
                          fontSize='0.6rem'
                          fontWeight={500}
                          color='gray.400'>
                          {crewMemberRole}
                        </Text>
                      </Flex>
                    </Flex>
                    <Button
                      width='auto'
                      height='2rem'
                      onClick={() =>
                        handleClickReviewButton(nickname, crewMemberRole, userId)
                      }
                      disabled={isReviewed ? true : false}
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        borderRadius: '0.5rem',
                        padding: '0.25rem 0.5rem',
                        color: isReviewed ? 'green.800' : 'orange.800',
                        backgroundColor: isReviewed ? 'green.100' : 'orange.100',
                      }}>
                      {isReviewed ? '리뷰완료' : '리뷰하러 가기'}
                    </Button>
                    <ReviewBottomDrawer
                      isOpen={isOpen}
                      onClose={onClose}
                      selectedUserRole={selectedUserRole}
                      selectedUserName={selectedUserName}
                      selectedUserId={selectedUserId}
                      partyId={partyId}
                    />
                  </Flex>
                )
              )}
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
    </>
  );
};

export default FoodPartyReviewPage;
