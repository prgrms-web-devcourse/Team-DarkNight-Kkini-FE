import { Button, Flex, Text } from '@chakra-ui/react';
import StatusBadge from 'components/common/StatusBadge';
import ApplicationDrawer from 'components/FoodParty/Application/ApplicationDrawer';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { CiForkAndKnife, CiLocationOn } from 'react-icons/ci';
import { ApplicationItemType } from 'services/application';
import { ApplicationStatusChangePayload } from 'types/application';
import ROUTING_PATHS from 'utils/constants/routingPaths';

type ApplicationItemProps = {
  application: ApplicationItemType;
  onClick?: (props: ApplicationStatusChangePayload) => void;
};

const ApplicationItem = ({ application, onClick }: ApplicationItemProps) => {
  const { user, status, storeName, crewName, crewId } = application;
  const router = useRouter();
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
          <StatusBadge status={status} style={{ width: '3rem', textAlign: 'center' }} />
          <Text margin='0.3rem 0'>
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
          <Flex flexDirection='column'>
            <Flex gap='0.5rem' fontSize='0.9rem' textColor='gray.800' alignItems='center'>
              <CiLocationOn />
              <Text marginLeft='0.5rem'>{storeName}</Text>
            </Flex>
            <Flex alignItems='center' gap='0.5rem' marginTop='0.2rem'>
              <CiForkAndKnife />
              <Button
                height='1.5rem'
                fontSize='0.9rem'
                onClick={() =>
                  router.push(ROUTING_PATHS.FOOD_PARTY.DETAIL.INFORMATION(crewId))
                }>
                밥모임으로 이동하기
              </Button>
            </Flex>
          </Flex>
        </Flex>
        <Button onClick={() => setOpen(true)}>보기</Button>
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
