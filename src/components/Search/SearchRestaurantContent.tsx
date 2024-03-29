import { Accordion, Flex, Text } from '@chakra-ui/react';
import SearchRestaurantItem from 'components/Search/SearchRestaurantItem';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import { searchRestaurantListState } from 'stores/restaurant';

const NO_RESULT_MESSAGE = '결과가 없습니다!';

const SearchRestaurantContent = () => {
  const searchRestaurantList = useRecoilValue(searchRestaurantListState);

  return (
    <Flex
      pos='absolute'
      top='0'
      left='0'
      right='0'
      flexDir='column'
      bgColor='#f4f4f4'
      height='65%'
      m='1rem'
      borderRadius='8px'
      p='0.4rem'
      overflow='auto'>
      {searchRestaurantList.length > 0 ? (
        <Accordion allowToggle>
          {searchRestaurantList.map(
            (
              {
                placeName,
                categories,
                roadAddressName,
                placeId,
                photoUrls,
                kakaoPlaceUrl,
                phoneNumber,
              },
              index
            ) => (
              <SearchRestaurantItem
                key={placeId}
                index={index}
                name={placeName}
                address={roadAddressName}
                categories={categories}
                photos={photoUrls}
                placeUrl={kakaoPlaceUrl}
                phoneNumber={phoneNumber}
              />
            )
          )}
        </Accordion>
      ) : (
        <Flex flexDir='column' justify='center' align='center' m='auto 0'>
          <Image
            src='/images/kkini-logo.svg'
            alt='default'
            width={100}
            height={100}
            style={{ borderRadius: '8px' }}
          />
          <Text fontSize='lg'>{NO_RESULT_MESSAGE}</Text>
        </Flex>
      )}
    </Flex>
  );
};

export default SearchRestaurantContent;
