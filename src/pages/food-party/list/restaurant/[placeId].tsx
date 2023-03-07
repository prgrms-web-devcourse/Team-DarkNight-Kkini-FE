import { Flex, Heading } from '@chakra-ui/react';
import FoodPartyList from 'components/FoodParty/FoodPartyList';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

const SearchedFoodPartyList = () => {
  return (
    <Flex flexDirection='column' padding='1rem'>
      <Heading paddingBottom='1rem'>00 맛집의 밥모임 목록</Heading>
      <FoodPartyList foodPartyList={} onClick={} />
    </Flex>
  );
};

export default SearchedFoodPartyList;

export const getServerSideProps: GetServerSideProps = async () => {};
