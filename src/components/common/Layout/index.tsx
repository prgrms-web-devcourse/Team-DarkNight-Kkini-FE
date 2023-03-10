import { Box, ChakraProvider, Flex, useDisclosure } from '@chakra-ui/react';
import { Global } from '@emotion/react';
import Header from 'components/common/Layout/Header';
import Navigation from 'components/common/Layout/Navigation';
import CreateCommunityDrawer from 'components/DraggableDrawer/CreateCommunityDrawer';
import { ReactNode, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { silentLogin } from 'services/auth';
import { isCheckingRefreshTokenState, isLoginState } from 'stores/auth';
import theme from 'styles/chakra-theme';
import { BaseFont } from 'styles/fonts';
import globalStyle from 'styles/global';

const Layout = ({ children }: { children: ReactNode }) => {
  const setLoginState = useSetRecoilState(isLoginState);
  const setIsCheckingRefreshToken = useSetRecoilState(isCheckingRefreshTokenState);

  useEffect(() => {
    (async () => {
      try {
        const token = await silentLogin();
        token && setLoginState(true);
      } finally {
        setIsCheckingRefreshToken(true);
      }
    })();
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure(); // 로그인 모달

  return (
    <ChakraProvider resetCSS theme={theme}>
      <Global styles={globalStyle} />
      <Flex
        flexDirection='column'
        id='app'
        className={BaseFont.className}
        overflowY='hidden'>
        <Header isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
        {/* To Do: 스크롤바 스타일링 필요 by 승준 */}
        <Box as='main' flex={1} pos='relative' overflowY='auto'>
          {children}
          <CreateCommunityDrawer />
        </Box>
        <Navigation isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
      </Flex>
    </ChakraProvider>
  );
};

export default Layout;
