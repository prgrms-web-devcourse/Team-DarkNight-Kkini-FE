import { Box, ChakraProvider, Flex } from '@chakra-ui/react';
import Header from 'components/common/Layout/Header';
import Navigation from 'components/common/Layout/Navigation';
import CreateCommunityDrawer from 'components/DraggableDrawer/CreateCommunityDrawer';
import { ReactNode } from 'react';
import { BaseFont } from 'styles/fonts';

// import DraggableDrawer from '../../DraggableDrawer/index';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <ChakraProvider resetCSS>
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
