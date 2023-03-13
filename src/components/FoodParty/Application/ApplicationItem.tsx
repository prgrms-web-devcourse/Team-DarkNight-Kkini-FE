import { Badge, Button, Flex, Text } from '@chakra-ui/react';
import ApplicationDrawer from 'components/FoodParty/Application/ApplicationDrawer';
import { useState } from 'react';
import { CiLocationOn } from 'react-icons/ci';
import { ApplicationItemType } from 'services/application';
import { ApplicationStatusChangePayload } from 'types/application';

type ApplicationItemProps = {
  application: ApplicationItemType;
  onClick?: (props: ApplicationStatusChangePayload) => void;
};

const ApplicationItem = ({ application, onClick }: ApplicationItemProps) => {
  const { user, status, storeName, crewName } = application;
  const [isOpen, setOpen] = useState(false);
  const closeDrawer = () => setOpen(false);

  return (
    <>
      <Flex
        padding='1rem'
        borderRadius='1rem'
        border='1px solid #e2e5e6'
        marginBottom='1rem'
        justifyContent='space-between'
        alignItems='center'
        gap='1rem'>
        <Flex direction='column'>
          <Badge colorScheme='purple' width='3rem' textAlign='center'>
            {status}
          </Badge>
          <Text marginTop='0.3rem'>
            <Text as='span' fontWeight='600'>
              {crewName}
            </Text>{' '}
            밥모임에{' '}
            {onClick && (
              <Text as='span' fontWeight='600'>
                {user.nickname}님이
              </Text>
            )}{' '}
            신청했습니다.
          </Text>
          <Flex alignItems='center' gap='0.5rem' fontSize='0.9rem' textColor='purple.500'>
            <CiLocationOn />
            <Text>{storeName}</Text>
          </Flex>
        </Flex>
        <Button backgroundColor='#E9D8FD' onClick={() => setOpen(true)}>
          보기
        </Button>
      </Flex>
      <ApplicationDrawer
        isOpen={isOpen}
        onClose={closeDrawer}
        application={application}
        onClickChangeApplicationStatus={onClick}
      />
    </>
  );
};

export default ApplicationItem;
