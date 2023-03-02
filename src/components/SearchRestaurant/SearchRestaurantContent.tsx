import { Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import { searchRestaurantListState } from 'stores/Restaurant';
import { GangwonEduFont } from 'styles/fonts';

import RestaurantItem from './RestaurantItem';

const NO_RESULT_MESSAGE = '결과가 없습니다!';

const SearchRestaurantContent = () => {
  const restaurantList = useRecoilValue(searchRestaurantListState);

  return (
    <Flex
      pos='absolute'
      top='0'
      left='0'
      right='0'
      flexDir='column'
      bgColor='#f4f4f4'
      height='75%'
      m='1rem'
      borderRadius='8px'
      p='0.4rem'
      overflow='auto'>
      {restaurantList.length > 0 ? (
        restaurantList.map(({ place_name, road_address_name }) => (
          <RestaurantItem
            key={road_address_name}
            name={place_name}
            address={road_address_name}
            photo={'/images/default_restaurant.svg'}
          />
        ))
      ) : (
        <Flex flexDir='column' justify='center' align='center' m='auto 0'>
          <Image
            src='/assets/kkini-logo.svg'
            alt='default'
            width={100}
            height={100}
            style={{ borderRadius: '8px' }}
          />
          <Text fontSize='lg' className={GangwonEduFont.className}>
            {NO_RESULT_MESSAGE}
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

export default SearchRestaurantContent;
