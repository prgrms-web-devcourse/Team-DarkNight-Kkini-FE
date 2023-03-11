import { Flex, Heading } from '@chakra-ui/react';
import GoHomeWhenErrorInvoked from 'components/common/GoHomeWhenErrorInvoked';
import FoodPartyList from 'components/FoodParty/FoodPartyList';
import FoodPartyListSkeleton from 'components/FoodParty/FoodPartyListSkeleton';
import useRandomRestaurantContext from 'contexts/kakaoMap/randomRestaurant';
import { useGetSearchedFoodPartyList } from 'hooks/query/useFoodParty';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { selectedRestaurantState } from 'stores/Restaurant';
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
  const { randomRestaurant } = useRandomRestaurantContext();
  const setSelectedRestaurant = useSetRecoilState(selectedRestaurantState);
  const router = useRouter();
  const handleClickFoodPartyItem = (partyId: number) => {
    router.push(ROUTING_PATHS.FOOD_PARTY.DETAIL.INFORMATION(partyId));
  };
  const handleClickCreateFoodPartyButton = () => {
    const {
      placeId,
      placeName,
      categories,
      roadAddressName,
      photoUrls,
      kakaoPlaceUrl,
      phoneNumber,
      longitude,
      latitude,
    } = randomRestaurant;
    setSelectedRestaurant({
      placeId: String(placeId),
      placeName,
      categories,
      roadAddressName,
      photoUrls: photoUrls?.split(',') || [],
      kakaoPlaceUrl,
      phoneNumber,
      longitude,
      latitude,
    });
    router.push(ROUTING_PATHS.FOOD_PARTY.CREATE);
  };

  if (isLoading) return <FoodPartyListSkeleton foodPartyCount={2} />;
  if (error) return <div>{error.toString()}</div>;

  return (
    <>
      {isSuccess ? (
        <Flex flexDirection='column' padding='1rem'>
          <Heading paddingBottom='1rem'>{name}의 밥모임</Heading>
          <FoodPartyList
            foodPartyList={foodPartyList}
            onClickViewButton={handleClickFoodPartyItem}
            onClickCreateFoodPartyButton={handleClickCreateFoodPartyButton}
          />
        </Flex>
      ) : (
        <GoHomeWhenErrorInvoked />
      )}
    </>
  );
};

export default SearchedFoodPartyList;

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { placeId, name } = context.query;

  return {
    props: {
      placeId,
      name,
    },
  };
};
