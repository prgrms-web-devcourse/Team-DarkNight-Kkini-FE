import { Flex } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import { useRecoilValue } from 'recoil';
import { searchRestaurantList } from 'stores/Restaurant';

import RestaurantItem from './RestaurantItem';

const CreateCommunityContent = () => {
  // const theme = useTheme();
  const restaurantList = useRecoilValue(searchRestaurantList);

  return (
    <Flex
      flexDir='column'
      bgColor='#f4f4f4'
      height='100%'
      m='1rem'
      borderRadius='8px'
      p='0.4rem'>
      {restaurantList.map(({ place_name, road_address_name }) => (
        <RestaurantItem
          key={road_address_name}
          name={place_name}
          address={road_address_name}
          photo={'/images/default_restaurant.svg'}
        />
      ))}
    </Flex>
  );
};

export default CreateCommunityContent;
