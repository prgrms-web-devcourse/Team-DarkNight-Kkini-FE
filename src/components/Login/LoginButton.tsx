import { Box, Flex, Text } from '@chakra-ui/react';
import BottomDrawer from 'components/common/BottomDrawer';
import Button from 'components/common/Button';
import GoogleButton from 'components/Login/OAuth/GoogleButton';
import KakaoButton from 'components/Login/OAuth/KakaoButton';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { loginDrawerState } from 'stores/drawer';
import ROUTING_PATHS from 'utils/constants/routingPaths';

const LoginButton = () => {
  const [loginDrawer, setLoginDrawer] = useRecoilState(loginDrawerState);

  const handleClickLoginButton = () => {
    setLoginDrawer({ isOpen: true, urlAfterLogin: ROUTING_PATHS.HOME });
  };
  const handleClickCloseButton = () => {
    setLoginDrawer({ isOpen: false, urlAfterLogin: ROUTING_PATHS.HOME });
  };

  return (
    <>
      <Button
        onClick={handleClickLoginButton}
        width='4rem'
        height='2.5rem'
        style={{ backgroundColor: '#F6BB43' }}>
        로그인
      </Button>
      <BottomDrawer
        isOpen={loginDrawer.isOpen}
        onClose={handleClickCloseButton}
        header={
          <Flex justifyContent='space-between'>
            <Text fontSize='1.5rem'>로그인</Text>
            <Image
              src='/images/delete-btn.svg'
              alt='modal-close-button'
              onClick={handleClickCloseButton}
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
              <KakaoButton urlAfterLogin={loginDrawer.urlAfterLogin} />
              <GoogleButton urlAfterLogin={loginDrawer.urlAfterLogin} />
            </Flex>
          </Box>
        }
      />
    </>
  );
};

export default LoginButton;
