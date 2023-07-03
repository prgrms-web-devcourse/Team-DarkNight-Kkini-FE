import { Box, Button, Flex, Text } from '@chakra-ui/react';
import BottomDrawer from 'components/common/BottomDrawer';
import Image from 'next/image';

type DropOutDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  onClickDropOut: () => void;
};

const DropOutDrawer = ({ isOpen, onClickDropOut, onClose }: DropOutDrawerProps) => {
  return (
    <BottomDrawer
      isOpen={isOpen}
      onClose={onClose}
      header={
        <Flex justifyContent='space-between'>
          <Text fontSize='1.5rem'>회원탈퇴</Text>
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
        <Flex direction='column'>
          <Box margin='0.5rem 0' lineHeight='1.8' fontSize='1.1rem'>
            끼니 서비스에서 회원 정보를 탈퇴합니다.
          </Box>

          <Flex alignItems='center' padding='0.5rem 0' gap='0.8rem'>
            <Button flex='1' onClick={onClickDropOut}>
              탈퇴
            </Button>
            <Button flex='1' onClick={onClose} backgroundColor='#FEEBC8'>
              유지
            </Button>
          </Flex>
        </Flex>
      }
    />
  );
};

export default DropOutDrawer;
