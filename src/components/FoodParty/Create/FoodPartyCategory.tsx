import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import { foodPartyCategory } from 'utils/constants/foodparty';

type FoodPartyCategoryItemProps = {
  onClick: (value: string) => void;
};

const FoodPartyCategoryItem = ({ onClick }: FoodPartyCategoryItemProps) => {
  return (
    <Flex direction='row' gap={2} align='stretch' flexWrap='wrap'>
      {foodPartyCategory.map(({ title, icon, bgColor }) => (
        <Flex
          bgColor={bgColor}
          key={title}
          onClick={() => onClick(title)}
          p={1}
          w='max-content'
          borderRadius={8}>
          <Image src={icon} width={10} height={10} alt='categoryIcon' />
          <Text fontSize='sm' pl={1.5}>
            {title}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
};

export default FoodPartyCategoryItem;
