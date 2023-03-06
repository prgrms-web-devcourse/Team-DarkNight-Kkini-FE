import { Flex, SkeletonCircle } from '@chakra-ui/react';

const AvatarGroupSkeleton = ({ avatarCount }: { avatarCount: number }) => {
  const avatarSkeletons = Array.from(
    { length: avatarCount },
    (_, index) => `avatar-skeleton-${index}`
  );

  return (
    <Flex alignItems='center'>
      {avatarSkeletons.map((avatarSkeletonKey, index) => (
        <SkeletonCircle
          key={avatarSkeletonKey}
          marginLeft={index !== 0 ? '-0.5rem' : '0rem'}
        />
      ))}
    </Flex>
  );
};

export default AvatarGroupSkeleton;
