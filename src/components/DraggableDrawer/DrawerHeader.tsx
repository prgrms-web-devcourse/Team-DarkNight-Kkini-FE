import { Box } from '@chakra-ui/react';

const DrawerHeader = () => {
  return (
    <Box
      position='relative'
      h={24}
      borderTopLeftRadius={8}
      borderTopRightRadius={8}
      pt={4}
      pb={4}>
      <Box w={32} h={2} borderRadius={2} bg='#d0d0d0' margin='auto'></Box>
    </Box>
  );
};

export default DrawerHeader;
