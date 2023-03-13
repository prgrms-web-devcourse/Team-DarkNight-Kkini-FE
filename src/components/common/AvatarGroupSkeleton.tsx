import { Flex, SkeletonCircle } from '@chakra-ui/react';

let uniqueNumberId = 0;

const AvatarGroupSkeleton = ({ avatarCount }: { avatarCount: number }) => {
  const avatarSkeletons = Array.from({ length: avatarCount }, () => {
    uniqueNumberId += 1;
    return `avatar-skeleton-${uniqueNumberId}`;
  });

  return (
    <Flex alignItems='center'>
      {avatarSkeletons.map((avatarSkeletonKey, index) => (
        <SkeletonCircle
          key={avatarSkeletonKey}
          marginLeft={index !== 0 ? '-0.5rem' : '0rem'}
          size='7'
        />
      ))}
    </Flex>
  );
};

export default AvatarGroupSkeleton;
