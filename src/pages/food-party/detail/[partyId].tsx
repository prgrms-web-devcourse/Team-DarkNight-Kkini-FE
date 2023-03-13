import { Flex, useDisclosure } from '@chakra-ui/react';
import GoHomeWhenErrorInvoked from 'components/common/GoHomeWhenErrorInvoked';
import FoodPartyApplicationDrawer from 'components/FoodParty/FoodPartyApplicationDrawer';
import FoodPartyDetailContent from 'components/FoodParty/FoodPartyDetail/FoodPartyDetailContent';
import FoodPartyDetailHeader from 'components/FoodParty/FoodPartyDetail/FoodPartyDetailHeader';
import FoodPartyDetailSkeleton from 'components/FoodParty/FoodPartyDetail/FoodPartyDetailSkeleton';
import FoodPartyDetailStatusButton from 'components/FoodParty/FoodPartyDetail/FoodPartyDetailStatusButton';
import FoodPartyMemberList from 'components/FoodParty/FoodPartyDetail/FoodPartyMemberList';
import RestaurantBottomDrawer from 'components/Restaurant/RestaurantBottomDrawer';
import {
  useCreateFoodPartyApplication,
  useGetFoodPartyDetail,
  useUpdateFoodPartyStatus,
} from 'hooks/query/useFoodParty';
import { useGetUser } from 'hooks/query/useUser';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { FoodPartyDetailStatusButtonText } from 'types/foodParty';
import ROUTING_PATHS from 'utils/constants/routingPaths';

// To Do: 404 처리 by 승준
// partyId로 조회하는 페이지
// 조회가 안되면 404 처리
const FoodPartyDetail = ({ partyId }: { partyId: string }) => {
  const { data: userInformation } = useGetUser();
  // To Do: 실시간 업데이트를 위한 refetch 필요 by 승준
  const {
    data: foodPartyDetail,
    isLoading,
    isSuccess,
    isLeader,
    isMember,
    isFull,
    leaderUserId,
    error,
  } = useGetFoodPartyDetail(partyId, userInformation?.id);
  const { mutate: updateFoodPartyStatus } = useUpdateFoodPartyStatus(partyId);
  const { mutate: createFoodPartyApplication } = useCreateFoodPartyApplication(
    partyId,
    leaderUserId || -1
  );
  const {
    isOpen: isOpenRestaurantBottomDrawer,
    onClose: onCloseRestaurantBottomDrawer,
    onOpen: onOpenRestaurantBottomDrawer,
  } = useDisclosure();
  const {
    isOpen: isOpenApplicationDrawer,
    onClose: onCloseApplicationDrawer,
    onOpen: onOpenApplicationDrawer,
  } = useDisclosure();
  const router = useRouter();

  if (isLoading) return <FoodPartyDetailSkeleton />;
  if (error) return <GoHomeWhenErrorInvoked />;

  const handleClickFoodPartyDetailStatusButton = (
    buttonText: FoodPartyDetailStatusButtonText
  ) => {
    switch (buttonText) {
      case '모집 완료할끼니?':
        // To Do: alert 띄우기 by 승준
        updateFoodPartyStatus('모집 종료');
        return;
      case '식사를 완료했끼니?':
        // To Do: alert 띄우기 by 승준
        updateFoodPartyStatus('식사 완료');
        return;
      case '참여할 끼니?':
        onOpenApplicationDrawer();
        return;
      default:
        return;
    }
  };

  const handleClickChatButton = () => {
    router.push(ROUTING_PATHS.FOOD_PARTY.DETAIL.CHAT(partyId));
  };

  return (
    <>
      {isSuccess ? (
        <Flex
          position='relative'
          height='100%'
          flexDirection='column'
          padding='1rem'
          gap='0.5rem'>
          <FoodPartyDetailHeader
            status={foodPartyDetail.crewStatus}
            category={foodPartyDetail.category}
            foodPartyName={foodPartyDetail.name}
          />
          <FoodPartyDetailContent
            promiseTime={foodPartyDetail.promiseTime}
            content={foodPartyDetail.content}
            onClick={onOpenRestaurantBottomDrawer}
          />
          <FoodPartyMemberList
            onClickChatButton={isLeader || isMember ? handleClickChatButton : undefined}
            memberList={foodPartyDetail.members}
            capacity={foodPartyDetail.capacity}
          />
          <FoodPartyDetailStatusButton
            applied={foodPartyDetail.proposalStatus}
            isLeader={isLeader}
            isMember={isMember}
            isFull={isFull}
            onClick={handleClickFoodPartyDetailStatusButton}
            status={foodPartyDetail.crewStatus}
          />
          <RestaurantBottomDrawer
            isOpen={isOpenRestaurantBottomDrawer}
            onClose={onCloseRestaurantBottomDrawer}
            restaurant={foodPartyDetail.response}
          />
          <FoodPartyApplicationDrawer
            isOpen={isOpenApplicationDrawer}
            onClose={onCloseApplicationDrawer}
            onClickSubmitButton={createFoodPartyApplication}
          />
        </Flex>
      ) : (
        <GoHomeWhenErrorInvoked />
      )}
    </>
  );
};

export default FoodPartyDetail;

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { partyId } = context.query;

  return {
    props: {
      partyId,
    },
  };
};
