import { CircularProgress, Flex } from '@chakra-ui/react';

const FoodPartyDetailChatLoadingSpinner = () => {
  return (
    <Flex
      width='100%'
      height='100%'
      justifyContent='center'
      alignItems='center'
      backgroundColor='#f2f2f2'>
      <CircularProgress isIndeterminate color='primary' />
    </Flex>
  );
};

export default FoodPartyDetailChatLoadingSpinner;
