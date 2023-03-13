import { Avatar, Badge, Box, Button, Flex, Text } from '@chakra-ui/react';
import BottomDrawer from 'components/common/BottomDrawer';
import Image from 'next/image';
import { ApplicationItemType } from 'services/application';
import { ApplicationStatusChangePayload } from 'types/application';

type ApplicationDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  onClickChangeApplicationStatus?: (props: ApplicationStatusChangePayload) => void;
  application: ApplicationItemType;
};

const ApplicationDrawer = ({
  isOpen,
  onClose,
  onClickChangeApplicationStatus,
  application,
}: ApplicationDrawerProps) => {
  const { user, crewName, id } = application;

  const handleClickApplicationChangeStatus = (
    id: number,
    status: boolean,
    onClose: () => void
  ) => {
    if (!onClickChangeApplicationStatus) return;

    onClickChangeApplicationStatus({
      applicationId: id,
      status: status ? '승인' : '거절',
      closeApplicationDrawer: onClose,
    });
  };

  return (
    <BottomDrawer
      isOpen={isOpen}
      onClose={onClose}
      header={
        <Flex justifyContent='space-between'>
          <Text fontSize='1.5rem'>
            {onClickChangeApplicationStatus
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
            {onClickChangeApplicationStatus && (
              <>
                <Flex alignItems='center' gap='0.5rem' padding='0.8rem 0'>
                  <Avatar src={user.profileImgUrl} size='sm' />
                  <Text fontSize='sm'>{user.nickname}</Text>
                  <Badge colorScheme='orange'>매너온도 {user.mannerScore}</Badge>
                </Flex>
                <Flex alignItems='center' padding='0.5rem 0' gap='0.8rem'>
                  <Button
                    flex='1'
                    onClick={() => handleClickApplicationChangeStatus(id, true, onClose)}>
                    좋아요
                  </Button>
                  <Button
                    flex='1'
                    onClick={() =>
                      handleClickApplicationChangeStatus(id, false, onClose)
                    }>
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
