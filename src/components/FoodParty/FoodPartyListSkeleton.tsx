import { Box, Flex, Skeleton, SkeletonText } from '@chakra-ui/react';
import AvatarGroupSkeleton from 'components/common/AvatarGroupSkeleton';

const FoodPartyListSkeleton = ({ foodPartyCount }: { foodPartyCount: number }) => {
  const foodPartySkeletons = Array.from(
    { length: foodPartyCount },
    (_, index) => `food-party-dummy-skeleton-${index}`
  );

  return (
    <Flex flexDirection='column' padding='1rem' height='100%'>
      <Skeleton marginBottom='1rem' borderRadius='0.5rem' height='4rem'></Skeleton>
      <Flex flexDirection='column'>
        {foodPartySkeletons.map((foodPartySkeletonKey) => (
          <Flex
            key={foodPartySkeletonKey}
            alignItems='center'
            justifyContent='space-between'
            boxShadow='button'
            borderRadius='1rem'
            padding='1rem'
            marginBottom='1rem'
            border='1px solid #e2e5e6'>
            <Box width='60%'>
              <SkeletonText noOfLines={2} spacing='4' skeletonHeight='3' />
            </Box>
            <AvatarGroupSkeleton avatarCount={3} />
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default FoodPartyListSkeleton;
