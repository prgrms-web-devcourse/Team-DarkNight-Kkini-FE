import { Button, Divider, Flex, Skeleton, SkeletonText } from '@chakra-ui/react';
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
            flexDirection='column'
            border='1px solid #e2e5e6'
            borderRadius='1rem'
            padding='1rem'
            gap='1rem'
            marginBottom='1rem'>
            <SkeletonText noOfLines={2} spacing='4' skeletonHeight='3' />
            <Divider />
            <Flex justifyContent='space-between'>
              <AvatarGroupSkeleton avatarCount={3} />
              <Skeleton borderRadius='0.5rem'>
                <Button>View</Button>
              </Skeleton>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default FoodPartyListSkeleton;
