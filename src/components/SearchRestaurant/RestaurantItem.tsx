import { Box, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

type RestaurantItemProps = {
  name: string;
  address: string;
  photo: string;
};

const RestaurantItem = ({ name, address, photo }: RestaurantItemProps) => {
  return (
    <Flex
      align='center'
      w='100%'
      bgColor='#fff'
      h='4rem'
      borderRadius='8px'
      p='0.2rem'
      mb='0.2rem'>
      <Box pos='relative' borderRadius='8px' width='50px' height='50px'>
        <Image src={'/images/default_restaurant.svg'} alt={name} width={50} height={50} />
      </Box>
      <Flex flexDir='column' justify='space-around' pl='0.2rem'>
        <Text fontSize='xl' fontWeight='bold'>
          {name}
        </Text>
        <Text fontSize='sm' color='grey'>
          {address}
        </Text>
      </Flex>
    </Flex>
  );
};

export default RestaurantItem;
