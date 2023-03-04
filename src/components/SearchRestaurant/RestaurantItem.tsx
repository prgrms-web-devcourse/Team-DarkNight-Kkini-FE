import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import Button from 'components/common/Button';
import Category from 'components/common/Category';
// import Image from 'next/image';
import React from 'react';

type RestaurantItemProps = {
  name: string;
  address: string;
  categories: string[];
  photos: string[];
  placeUrl: string;
  phoneNumber: string;
};

const RestaurantItem = ({
  name,
  address,
  categories,
  photos,
  placeUrl,
  phoneNumber,
}: RestaurantItemProps) => {
  return (
    <AccordionItem w='100%'>
      <h2>
        <AccordionButton borderRadius='8px'>
          <Box as='span' flex='1' textAlign='left'>
            <Text fontSize='xl' fontWeight={600}>
              {name}
            </Text>
            <Text fontSize='md' color='#b2b4b8'>
              {address}
            </Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel>
        <Flex w='100%' flexDir='column' justify='space-between'>
          <Stack direction='row'>
            {categories.map((category) => (
              <Category key={category}>{category}</Category>
            ))}
          </Stack>
          <Text fontSize='sm' color='#8b8b8b'>
            {phoneNumber}
          </Text>
          <Flex overflowX='auto' gap='1rem' py='0.5rem'>
            {photos?.map((photoUrl) => (
              <Image
                key={photoUrl}
                referrerPolicy='no-referrer'
                boxSize='100px'
                borderRadius={8}
                objectFit='cover'
                src={photoUrl}
                alt='food'
              />
            ))}
          </Flex>
          <Button>밥모임 생성하기</Button>
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default React.memo(RestaurantItem);
