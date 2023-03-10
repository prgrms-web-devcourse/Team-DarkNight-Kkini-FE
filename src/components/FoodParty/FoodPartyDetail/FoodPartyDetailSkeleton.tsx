import { Flex, SkeletonText } from '@chakra-ui/react';

const FoodPartyDetailSkeleton = () => {
  return (
    <Flex flexDirection='column' padding='1rem' height='100%' gap='0.5rem'>
      <SkeletonText />
    </Flex>
  );
};

export default FoodPartyDetailSkeleton;
