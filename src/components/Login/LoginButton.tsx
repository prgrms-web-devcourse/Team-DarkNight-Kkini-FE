import { Box, Flex, Text } from '@chakra-ui/react';
import BottomDrawer from 'components/common/BottomDrawer';
import Button from 'components/common/Button';
import GoogleButton from 'components/Login/OAuth/GoogleButton';
import KakaoButton from 'components/Login/OAuth/KakaoButton';
import Image from 'next/image';
import { LoginModal } from 'types/modal';

const LoginButton = ({ isOpen, onClose, onOpen }: LoginModal) => {
  return (
    <>
      <Button
        onClick={onOpen}
        width='4rem'
        height='2.5rem'
        style={{ backgroundColor: '#F6BB43' }}>
        로그인
      </Button>
      <BottomDrawer
        isOpen={isOpen}
        onClose={onClose}
        header={
          <Flex justifyContent='space-between'>
            <Text fontSize='1.5rem'>로그인</Text>
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
          <Box padding='1rem 0'>
            <Text fontSize='1.125rem' paddingBottom='0.8rem'>
              지금 로그인해서 맛집을 함께 경험해보세요
            </Text>
            <Flex direction='column' gap='0.5rem'>
              <KakaoButton />
              <GoogleButton />
            </Flex>
          </Box>
        }
      />
    </>
  );
};

export default LoginButton;
