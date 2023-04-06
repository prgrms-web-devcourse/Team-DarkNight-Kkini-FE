import { Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import GoHomeWhenErrorInvoked from 'components/common/GoHomeWhenErrorInvoked';
import ApplicationSkeleton from 'components/FoodParty/Application/ApplicationSkeleton';
import ReceivedApplication from 'components/FoodParty/Application/ReceivedApplication';
import SentApplication from 'components/FoodParty/Application/SentApplication';
import { useGetUser } from 'hooks/query/useUser';
import Head from 'next/head';
import { Suspense } from 'react';

const Application = () => {
  const { data, isLoading, isError } = useGetUser();

  if (isLoading) return;
  if (isError) return <GoHomeWhenErrorInvoked />;

  return (
    <>
      <Head>
        <title>신청서 목록</title>
      </Head>
      <Heading size='lg' padding='1rem'>
        신청서
      </Heading>
      <Tabs variant='soft-rounded' colorScheme='orange' isFitted padding='0 0.8rem'>
        <TabList>
          <Tab>받은 신청서</Tab>
          <Tab>보낸 신청서</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Suspense fallback={<ApplicationSkeleton />}>
              <ReceivedApplication id={data.id} />
            </Suspense>
          </TabPanel>
          <TabPanel>
            <Suspense fallback={<ApplicationSkeleton />}>
              <SentApplication id={data.id} />
            </Suspense>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Application;
