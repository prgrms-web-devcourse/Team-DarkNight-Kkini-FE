import { Divider, Flex, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import { AiOutlineCalendar, AiOutlineClockCircle, AiOutlineSearch } from 'react-icons/ai';

const FoodPartyDetailSkeleton = () => {
  return (
    <Flex flexDirection='column' padding='1rem' height='100%' gap='0.5rem'>
      <SkeletonText noOfLines={1} skeletonHeight='5' width={'30%'} />
      <SkeletonText noOfLines={1} skeletonHeight='10' />
      <Divider margin='0.25rem 0' />
      <Flex alignItems='center' gap='0.5rem' width='100%'>
        <AiOutlineCalendar />
        <SkeletonText noOfLines={1} skeletonHeight='6' width={'30%'} />
      </Flex>
      <Flex alignItems='center' gap='0.5rem' width='100%'>
        <AiOutlineClockCircle />
        <SkeletonText noOfLines={1} skeletonHeight='6' width={'30%'} />
      </Flex>
      <Flex alignItems='center' gap='0.5rem' width='100%'>
        <AiOutlineSearch />
        <SkeletonText noOfLines={1} skeletonHeight='6' width={'30%'} />
      </Flex>
      <SkeletonText noOfLines={3} skeletonHeight='5' spacing='2' marginTop='1rem' />
      <SkeletonText noOfLines={1} skeletonHeight='7' width={'30%'} marginTop='1rem' />
      <Flex alignItems='center' gap='0.5rem'>
        <SkeletonCircle />
        <SkeletonText noOfLines={1} skeletonHeight='10' flex={1} />
      </Flex>
      <Flex alignItems='center' gap='0.5rem'>
        <SkeletonCircle />
        <SkeletonText noOfLines={1} skeletonHeight='10' flex={1} />
      </Flex>
      <Flex alignItems='center' gap='0.5rem'>
        <SkeletonCircle />
        <SkeletonText noOfLines={1} skeletonHeight='10' flex={1} />
      </Flex>
    </Flex>
  );
};

export default FoodPartyDetailSkeleton;
