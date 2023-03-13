import { Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import ReceivedApplication from 'components/FoodParty/Application/ReceivedApplication';
import SentApplication from 'components/FoodParty/Application/SentApplication';

const Application = () => {
  return (
    <>
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
            <ReceivedApplication />
          </TabPanel>
          <TabPanel>
            <SentApplication />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Application;
