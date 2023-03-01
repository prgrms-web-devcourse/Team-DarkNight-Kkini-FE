import { Box, ChakraProvider, Flex } from '@chakra-ui/react';
import { Global } from '@emotion/react';
import Header from 'components/common/Layout/Header';
import Navigation from 'components/common/Layout/Navigation';
import CreateCommunityDrawer from 'components/DraggableDrawer/CreateCommunityDrawer';
import { ReactNode } from 'react';
import theme from 'styles/chakra-theme';
import { BaseFont } from 'styles/fonts';
import globalStyle from 'styles/global';

// import DraggableDrawer from '../../DraggableDrawer/index';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Global styles={globalStyle} />
      <Flex
        flexDirection='column'
        id='app'
        className={BaseFont.className}
        overflowY='hidden'>
        <Header />
        <Box as='main' flex={1} pos='relative'>
          {children}
          <CreateCommunityDrawer />
        </Box>
        <Navigation />
      </Flex>
    </ChakraProvider>
  );
};

export default Layout;
