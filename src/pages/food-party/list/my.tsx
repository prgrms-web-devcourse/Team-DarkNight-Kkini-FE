import { Flex, Heading } from '@chakra-ui/react';
import CustomSuspense from 'components/common/CustomSuspense';
import ErrorBoundary from 'components/common/ErrorBoundary';
import GoHomeWhenErrorInvoked from 'components/common/GoHomeWhenErrorInvoked';
import FoodPartyListSkeleton from 'components/FoodParty/FoodPartyListSkeleton';
import MyFoodPartyList from 'components/FoodParty/MyFoodPartyList';
import Head from 'next/head';

const MyFoodPartyListPage = () => {
  return (
    <>
      <Head>
        <title>내가 참여한 밥모임 목록</title>
      </Head>
      <Flex flexDirection='column' padding='1rem'>
        <Heading paddingBottom='1rem'>나의 밥모임 목록</Heading>
        <ErrorBoundary fallback={<GoHomeWhenErrorInvoked />}>
          <CustomSuspense fallback={<FoodPartyListSkeleton foodPartyCount={2} />}>
            <MyFoodPartyList />
          </CustomSuspense>
        </ErrorBoundary>
      </Flex>
    </>
  );
};

export default MyFoodPartyListPage;
