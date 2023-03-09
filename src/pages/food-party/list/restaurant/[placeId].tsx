import { Flex, Heading } from '@chakra-ui/react';
import { QueryClient } from '@tanstack/react-query';
import FoodPartyList from 'components/FoodParty/FoodPartyList';
import { useGetSearchedFoodPartyList } from 'hooks/query/useFoodParty';
import { GetServerSideProps } from 'next';
import { fetchFoodPartyList } from 'services/foodParty';
import QUERY_KEYS from 'utils/constants/queryKeys';

type SearchedFoodPartyListQuery = {
  placeId: string;
  page: number;
  size: number;
};

type SearchedFoodPartyListProps = SearchedFoodPartyListQuery;

const SearchedFoodPartyList = ({ placeId, page, size }: SearchedFoodPartyListProps) => {
  const { data } = useGetSearchedFoodPartyList(placeId);

  return (
    <Flex flexDirection='column' padding='1rem'>
      <Heading paddingBottom='1rem'>00 맛집의 밥모임 목록</Heading>
      {/* <FoodPartyList foodPartyList={} onClick={} /> */}
    </Flex>
  );
};

export default SearchedFoodPartyList;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { placeId } = context.query;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.FOOD_PARTY.SEARCHED_FOOD_PARTY_LIST, placeId],
    queryFn: () => fetchFoodPartyList(placeId as string),
  });

  return {
    props: {
      placeId,
    },
  };
};
