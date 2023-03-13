import { Box, Text } from '@chakra-ui/react';
import SearchRestaurant from 'components/SearchRestaurant';

const DrawerHeader = () => {
  return (
    <Box
      display='flex'
      flexDir='column'
      position='relative'
      h={32}
      borderTopLeftRadius={8}
      borderTopRightRadius={8}
      pt={4}>
      <Box w={16} h={2} borderRadius={2} bg='#d0d0d0' margin='auto'></Box>
      <Text fontSize='lg' pl={5}>
        밥모임 가게 검색
      </Text>
      <SearchRestaurant />
    </Box>
  );
};

export default DrawerHeader;
