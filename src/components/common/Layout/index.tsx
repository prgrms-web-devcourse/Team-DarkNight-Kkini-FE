import { Box, ChakraProvider, Flex } from '@chakra-ui/react';
import Header from 'components/common/Layout/Header';
import Navigation from 'components/common/Layout/Navigation';
import { ReactNode } from 'react';
import { BaseFont } from 'styles/fonts';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <ChakraProvider resetCSS>
      <Flex flexDirection='column' id='app' className={BaseFont.className}>
        <Header />
        <Box as='main' flex={1}>
          {children}
        </Box>
        <Navigation />
      </Flex>
    </ChakraProvider>
  );
};

export default Layout;
