import { Avatar, Badge, Box, Button, Flex, Text } from '@chakra-ui/react';
import BottomDrawer from 'components/common/BottomDrawer';
import Image from 'next/image';
import { ApplicationItemType } from 'services/application';

type ApplicationDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  onClickChangeApplicationState?: (applicationId: number, status: boolean) => void;
  application: ApplicationItemType;
};

const ApplicationDrawer = ({
  isOpen,
  onClose,
  onClickChangeApplicationState,
  application,
}: ApplicationDrawerProps) => {
  const { user, crewName, id } = application;

  return (
    <BottomDrawer
      isOpen={isOpen}
      onClose={onClose}
      header={
        <Flex justifyContent='space-between'>
          <Text fontSize='1.5rem'>
            {onClickChangeApplicationState
              ? `${user.nickname}님이 보낸 신청서`
              : `${crewName} 밥모임에게`}
          </Text>
          <Image
            src='/images/delete-btn.svg'
            alt='modal-close-button'
            onClick={onClose}
            width='25'
            height='25'
          />
        </Flex>
      }
      body={
        <>
          <Flex flexDirection='column'>
            <Box
              w='100%'
              maxH='5rem'
              overflowY='auto'
              margin='0.5rem 0'
              lineHeight='1.8'
              fontSize='1.1rem'>
              {application.content}
            </Box>
            {onClickChangeApplicationState && (
              <>
                <Flex alignItems='center' gap='0.5rem' padding='0.8rem 0'>
                  <Avatar src={user.profileImgUrl} size='sm' />
                  <Text fontSize='sm'>{user.nickname}</Text>
                  <Badge colorScheme='orange'>매너온도 {user.mannerScore}</Badge>
                </Flex>
                <Flex alignItems='center' padding='0.5rem 0' gap='0.8rem'>
                  <Button
                    flex='1'
                    onClick={() => onClickChangeApplicationState(id, true)}>
                    좋아요
                  </Button>
                  <Button
                    flex='1'
                    onClick={() => onClickChangeApplicationState(id, false)}>
                    죄송합니다
                  </Button>
                </Flex>
              </>
            )}
          </Flex>
        </>
      }
    />
  );
};

export default ApplicationDrawer;
