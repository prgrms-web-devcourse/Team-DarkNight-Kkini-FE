import { Flex, Heading } from '@chakra-ui/react';
import { QueryClient } from '@tanstack/react-query';
import FoodPartyList from 'components/FoodParty/FoodPartyList';
import { useGetSearchedFoodPartyList } from 'hooks/query/useFoodParty';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { fetchFoodPartyList } from 'services/foodParty';
import QUERY_KEYS from 'utils/constants/queryKeys';
import ROUTING_PATHS from 'utils/constants/routingPaths';

type SearchedFoodPartyListQuery = {
  placeId: string;
  name: string;
};

type SearchedFoodPartyListProps = SearchedFoodPartyListQuery;

const SearchedFoodPartyList = ({ placeId, name }: SearchedFoodPartyListProps) => {
  const {
    data: foodPartyList,
    isLoading,
    error,
    isSuccess,
  } = useGetSearchedFoodPartyList(placeId);
  const router = useRouter();
  const handleClickFoodPartyItem = (partyId: number) => {
    router.push(ROUTING_PATHS.FOOD_PARTY.DETAIL(partyId));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.toString()}</div>;

  return (
    <>
      {isSuccess && (
        <Flex flexDirection='column' padding='1rem'>
          <Heading paddingBottom='1rem'>{name}의 밥모임</Heading>
          <FoodPartyList
            foodPartyList={foodPartyList}
            onClick={handleClickFoodPartyItem}
          />
        </Flex>
      )}
    </>
  );
};

export default SearchedFoodPartyList;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { placeId, name } = context.query;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.FOOD_PARTY.SEARCHED_FOOD_PARTY_LIST, placeId],
    queryFn: () => fetchFoodPartyList(placeId as string),
  });

  return {
    props: {
      placeId,
      name,
    },
  };
};
