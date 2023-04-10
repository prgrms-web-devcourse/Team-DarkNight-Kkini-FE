import { Flex, Heading } from '@chakra-ui/react';
import GoHomeWhenErrorInvoked from 'components/common/GoHomeWhenErrorInvoked';
import FoodPartyList from 'components/FoodParty/FoodPartyList';
import FoodPartyListSkeleton from 'components/FoodParty/FoodPartyListSkeleton';
import useRandomRestaurantContext from 'contexts/kakaoMap/randomRestaurant';
import { useGetSearchedFoodPartyList } from 'hooks/query/useFoodParty';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { selectedRestaurantState } from 'stores/restaurant';
import ROUTING_PATHS from 'utils/constants/routingPaths';
import { getPhotoUrlsArray } from 'utils/helpers/foodParty';

const SearchedFoodPartyList = () => {
  const router = useRouter();
  const { placeId, restaurantName } = router.query as {
    placeId: string;
    restaurantName: string;
  };
  const {
    data: foodPartyList,
    isLoading,
    error,
    isSuccess,
  } = useGetSearchedFoodPartyList(placeId);
  const { randomRestaurant } = useRandomRestaurantContext();
  const setSelectedRestaurant = useSetRecoilState(selectedRestaurantState);

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
      photoUrls: getPhotoUrlsArray(photoUrls || ''),
      kakaoPlaceUrl,
      phoneNumber,
      longitude,
      latitude,
    });
    router.push(ROUTING_PATHS.FOOD_PARTY.CREATE);
  };

  if (isLoading) return <FoodPartyListSkeleton foodPartyCount={2} />;
  if (error) return <GoHomeWhenErrorInvoked />;

  return (
    <>
      <Head>
        <title>{restaurantName} 음식점의 밥모임 목록</title>
      </Head>
      {isSuccess ? (
        <>
          <Flex flexDirection='column' padding='1rem'>
            <Heading paddingBottom='1rem'>{restaurantName}의 밥모임</Heading>
            <FoodPartyList
              isMyFoodParty={false}
              foodPartyList={foodPartyList}
              onClickViewButton={handleClickFoodPartyItem}
              onClickCreateFoodPartyButton={handleClickCreateFoodPartyButton}
            />
          </Flex>
        </>
      ) : (
        <GoHomeWhenErrorInvoked />
      )}
    </>
  );
};

export default SearchedFoodPartyList;
