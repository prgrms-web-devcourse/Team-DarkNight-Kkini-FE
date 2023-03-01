import { Box, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { isDrawerOpened } from 'stores/drawer';
import { searchRestaurantList } from 'stores/Restaurant';
import { GangwonEduFont } from 'styles/fonts';

import RestaurantItem from './RestaurantItem';

const DO_NOT_SEARCH_MESSAGE = '검색어를 입력해주세요!';
const NO_RESULT_MESSAGE = '결과가 없습니다!';

const SearchRestaurantContent = () => {
  const restaurantList = useRecoilValue(searchRestaurantList);
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const isOpened = useRecoilValue(isDrawerOpened);

  useEffect(() => {
    setIsSearched(false);
    restaurantList && setIsSearched(true);
  }, [isOpened, restaurantList]);

  console.log(isSearched, isOpened, restaurantList);

  return (
    <Flex
      pos='relative'
      flexDir='column'
      bgColor='#f4f4f4'
      height='100%'
      m='1rem'
      borderRadius='8px'
      p='0.4rem'
      overflowY='auto'>
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
        <Flex
          pos='absolute'
          top='20%'
          left='30%'
          flexDir='column'
          justify='center'
          align='center'>
          <Image
            src='/assets/kkini-logo.svg'
            alt='default'
            width={100}
            height={100}
            style={{ borderRadius: '8px' }}
          />
          <Text fontSize='lg' className={GangwonEduFont.className}>
            {isSearched ? NO_RESULT_MESSAGE : DO_NOT_SEARCH_MESSAGE}
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

export default SearchRestaurantContent;
