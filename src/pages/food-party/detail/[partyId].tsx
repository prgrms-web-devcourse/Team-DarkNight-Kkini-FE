import { Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import GoHomeWhenErrorInvoked from 'components/common/GoHomeWhenErrorInvoked';
import FoodPartyDetailChangeStatusButton from 'components/FoodParty/FoodPartyDetail/FoodPartyDetailChangeStatusButton';
import FoodPartyDetailHeader from 'components/FoodParty/FoodPartyDetail/FoodPartyDetailHeader';
import FoodPartyDetailSkeleton from 'components/FoodParty/FoodPartyDetail/FoodPartyDetailSkeleton';
import FoodPartyMemberList from 'components/FoodParty/FoodPartyDetail/FoodPartyMemberList';
import RestaurantBottomDrawer from 'components/Restaurant/RestaurantBottomDrawer';
import { useGetFoodPartyDetail } from 'hooks/query/useFoodParty';
import { useGetUser } from 'hooks/query/useUser';
import { GetServerSideProps } from 'next';
import { AiOutlineCalendar, AiOutlineClockCircle, AiOutlineSearch } from 'react-icons/ai';
import { fetchFoodPartyDetail } from 'services/foodParty';
import { fetchUser } from 'services/user';
import QUERY_KEYS from 'utils/constants/queryKeys';
import { templatePromiseDate, templatePromiseTime } from 'utils/helpers/foodParty';

// To Do: 404 처리 by 승준
// partyId로 조회하는 페이지
// 조회가 안되면 404 처리
const FoodPartyDetail = ({ partyId }: { partyId: string }) => {
  const { data: userInformation } = useGetUser();
  const {
    data: foodPartyDetail,
    isLoading,
    isSuccess,
    isLeader,
    isMember,
    isFull,
    error,
  } = useGetFoodPartyDetail(partyId, userInformation?.id);
  const { isOpen, onClose, onOpen } = useDisclosure();

  if (isLoading) return <FoodPartyDetailSkeleton />;
  if (error) return <div>{error.toString()}</div>;

  // To Do: Date 등 따로 컴포넌트를 빼자.
  const [year, month, day, hour, minute] = foodPartyDetail!.promiseTime;

  // To Do: isLeader, isMember, isFull, status에 따라 다르게
  // const router = useRouter();
  // const handleClickButton = () => {
  //  router.push
  // }

  return (
    <>
      {isSuccess ? (
        <Flex
          position='relative'
          height='100%'
          flexDirection='column'
          padding='1rem'
          gap='0.5rem'>
          {/* 헤더 */}
          <FoodPartyDetailHeader
            status={foodPartyDetail.status}
            category={foodPartyDetail.category}
            foodPartyName={foodPartyDetail.name}
          />
          {/* 데이터 & 가게 정보 */}
          <Flex flexDirection='column' gap='0.5rem'>
            <Flex alignItems='center' gap='0.5rem'>
              <AiOutlineCalendar />
              <Text>{templatePromiseDate(year, month, day)}</Text>
            </Flex>
            <Flex alignItems='center' gap='0.5rem'>
              <AiOutlineClockCircle />
              <Text>{templatePromiseTime(hour, minute)}</Text>
            </Flex>
            <Flex alignItems='center' gap='0.5rem'>
              <AiOutlineSearch />
              <Button onClick={onOpen} height='1.5rem'>
                맛집 정보
              </Button>
            </Flex>
          </Flex>
          {/* 내용 */}
          <Text margin='1rem 0'>{foodPartyDetail.content}</Text>
          {/* 멤버 리스트 */}
          <FoodPartyMemberList
            memberList={foodPartyDetail.members}
            capacity={foodPartyDetail.capacity}
          />
          <FoodPartyDetailChangeStatusButton
            isLeader={isLeader}
            isMember={isMember}
            isFull={isFull}
            // onClick={handleClickButton}
            status={foodPartyDetail.status}
          />
          <RestaurantBottomDrawer
            isOpen={isOpen}
            onClose={onClose}
            restaurant={foodPartyDetail.response}
          />
        </Flex>
      ) : (
        // To Do: 스타일링 필요 by 승준
        <GoHomeWhenErrorInvoked />
      )}
    </>
  );
};

export default FoodPartyDetail;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { partyId } = context.query;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.USER.MY_INFO],
    queryFn: () => fetchUser(),
  });
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.FOOD_PARTY.FOOD_PARTY_DETAIL, partyId],
    queryFn: () => fetchFoodPartyDetail(partyId as string),
  });

  return {
    props: {
      partyId,
      storeId: '1',
      dehydratedState: dehydrate(queryClient),
    },
  };
};
