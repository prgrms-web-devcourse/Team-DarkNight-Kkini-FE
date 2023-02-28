import { Box, Flex, Text } from '@chakra-ui/react';
import { css } from '@emotion/react';
import Image from 'next/image';
import React from 'react';

type RestaurantItemProps = {
  name: string;
  address: string;
  photo: string;
};

const RestaurantItem = ({ name, address, photo }: RestaurantItemProps) => {
  return (
    <Flex w='100%' bgColor='#fff' h='4rem' p='0.2rem'>
      <Box borderRadius='8px' width='50' height='50'>
        <Image src={'/images/default_restaurant.svg'} alt={name} width='50' height='50' />
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
