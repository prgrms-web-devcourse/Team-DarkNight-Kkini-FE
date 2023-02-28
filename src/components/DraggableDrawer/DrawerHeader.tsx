import { Box, Text } from '@chakra-ui/react';
import { GangwonEduFont } from 'styles/fonts';
const DrawerHeader = () => {
  return (
    <Box
      position='relative'
      h={16}
      borderTopLeftRadius={8}
      borderTopRightRadius={8}
      pt={4}
      pb={4}>
      <Box w={16} h={2} borderRadius={2} bg='#d0d0d0' margin='auto'></Box>
      <Text fontSize='lg' className={GangwonEduFont.className} pl={5}>
        맛모임 가게 검색
      </Text>
    </Box>
  );
};

export default DrawerHeader;
