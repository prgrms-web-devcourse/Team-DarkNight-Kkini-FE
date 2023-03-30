import { Flex, Skeleton } from '@chakra-ui/react';

const SKELETON_LIST_NUMBER = 2;

const ApplicationSkeletonItem = () => {
  return (
    <Flex
      padding='1rem'
      borderRadius='1rem'
      border='1px solid #e2e5e6'
      marginBottom='1rem'
      justifyContent='space-between'
      alignItems='center'>
      <Flex direction='column' width='70%'>
        <Skeleton width='3rem' height='1.5rem' marginBottom='0.75rem' />
        <Skeleton height='1rem' marginBottom='0.5rem' />
        <Skeleton height='1rem' />
      </Flex>
      <Skeleton width='3.5rem' height='2.5rem' borderRadius='0.5rem' />
    </Flex>
  );
};

const ApplicationSkeleton = () => {
  return (
    <>
      {Array.from({ length: SKELETON_LIST_NUMBER }, () => 0).map((_, index) => (
        <ApplicationSkeletonItem key={`application-skeleton-${index}`} />
      ))}
    </>
  );
};

export default ApplicationSkeleton;
