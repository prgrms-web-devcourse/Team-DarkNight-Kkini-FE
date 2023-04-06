import { Flex, useDisclosure } from '@chakra-ui/react';
import GoHomeWhenErrorInvoked from 'components/common/GoHomeWhenErrorInvoked';
import FoodPartyApplicationDrawer from 'components/FoodParty/FoodPartyApplicationDrawer';
import FoodPartyDetailContent from 'components/FoodParty/FoodPartyDetail/FoodPartyDetailContent';
import FoodPartyDetailHeader from 'components/FoodParty/FoodPartyDetail/FoodPartyDetailHeader';
import FoodPartyDetailModal from 'components/FoodParty/FoodPartyDetail/FoodPartyDetailModal';
import FoodPartyDetailSkeleton from 'components/FoodParty/FoodPartyDetail/FoodPartyDetailSkeleton';
import FoodPartyDetailStatusButton from 'components/FoodParty/FoodPartyDetail/FoodPartyDetailStatusButton';
import FoodPartyMemberList from 'components/FoodParty/FoodPartyDetail/FoodPartyMemberList';
import RestaurantBottomDrawer from 'components/Restaurant/RestaurantBottomDrawer';
import {
  useCreateFoodPartyApplication,
  useDeleteFoodPartyMember,
  useGetFoodPartyDetail,
  useUpdateFoodPartyMember,
  useUpdateFoodPartyStatus,
} from 'hooks/query/useFoodParty';
import { useGetUser } from 'hooks/query/useUser';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { foodPartyMemberWillBeKickedOutState } from 'stores/foodParty';
import { Member } from 'types/foodParty';
import ROUTING_PATHS from 'utils/constants/routingPaths';
import {
  CHANGE_FOOD_PARTY_STATUS_MODAL_TEXT,
  checkButtonTextIsDisabled,
  getFoodPartyDetailStatusButtonText,
} from 'utils/helpers/foodParty';
import { validateAbleToChat, validateAbleToKickOut } from 'utils/validations/foodParty';

// To Do: 404 처리 by 승준
// 조회가 안되면 에러 코드({"code":"CR001","message":"존재하지 않는 모임입니다."}) 맵핑하여 404 처리
const FoodPartyDetail = ({ partyId }: { partyId: string }) => {
  const router = useRouter();
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
  const { mutate: updateFoodPartyMember } = useUpdateFoodPartyMember(partyId);
  const { mutate: deleteFoodPartyMember } = useDeleteFoodPartyMember(partyId);
  const [foodPartyMemberWillBeKickedOut, setFoodPartyMemberWillBeKickedOut] =
    useRecoilState(foodPartyMemberWillBeKickedOutState);
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
  const {
    isOpen: isOpenCheckChangeStatusModal,
    onClose: onCloseCheckChangeStatusModal,
    onOpen: onOpenCheckChangeStatusModal,
  } = useDisclosure();
  const {
    isOpen: isOpenCheckExitModal,
    onClose: onCloseCheckExitModal,
    onOpen: onOpenCheckExitModal,
  } = useDisclosure();
  const {
    isOpen: isOpenCheckKickOutModal,
    onClose: onCloseCheckKickOutModal,
    onOpen: onOpenCheckKickOutModal,
  } = useDisclosure();

  if (isLoading) return <FoodPartyDetailSkeleton />;
  if (error) return <GoHomeWhenErrorInvoked />;

  // To Do: FoodPartyDetailStatusButtonText 타입을 쪼개기 위해 foodPartyDetailStatusButtonText도 쪼개야 됨. by 승준
  const foodPartyDetailStatusButtonText = getFoodPartyDetailStatusButtonText({
    applied: foodPartyDetail!.proposalStatus,
    isLeader,
    isMember,
    isFull,
    status: foodPartyDetail!.crewStatus,
  });

  const isDisabledFoodPartyDetailStatusButton = checkButtonTextIsDisabled(
    foodPartyDetailStatusButtonText
  );

  // 방장이 버튼을 눌러 밥모임 상태를 바꾸려 할 때 한 번 더 확인하는 모달을 뜨게 하는 핸들러
  const handleClickFoodPartyDetailStatusButton = () => {
    switch (foodPartyDetailStatusButtonText) {
      case '모집 완료할끼니?':
        onOpenCheckChangeStatusModal();
        return;
      case '식사를 완료했끼니?':
        onOpenCheckChangeStatusModal();
        return;
      case '참여할 끼니?':
        onOpenApplicationDrawer();
        return;
      case '나갈까요..?':
        onOpenCheckExitModal();
        return;
      default:
        return;
    }
  };

  // 모달에서 '네'를 누를 경우 어떤 서비스 로직이 동작하면 되는지 결정하는 핸들러
  const handleChangeFoodPartyDetailStatusButton = () => {
    switch (foodPartyDetailStatusButtonText) {
      case '모집 완료할끼니?':
        updateFoodPartyStatus('모집 종료');
        return;
      case '식사를 완료했끼니?':
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

  const handleClickKickOutButton = (member: Member) => {
    setFoodPartyMemberWillBeKickedOut({
      nickname: member.nickname,
      memberId: member.userId,
    });
    onOpenCheckKickOutModal();
  };

  return (
    <>
      <Head>
        <title>{foodPartyDetail?.name} - 밥모임 상세</title>
      </Head>
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
            ableToKickOut={validateAbleToKickOut(isLeader, foodPartyDetail.crewStatus)}
            onClickChatButton={validateAbleToChat(
              isLeader,
              isMember,
              handleClickChatButton
            )}
            onClickKickOutButton={handleClickKickOutButton}
            memberList={foodPartyDetail.members}
            capacity={foodPartyDetail.capacity}
          />
          <FoodPartyDetailStatusButton
            buttonText={foodPartyDetailStatusButtonText}
            isDisabled={isDisabledFoodPartyDetailStatusButton}
            onClick={handleClickFoodPartyDetailStatusButton}
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
          <FoodPartyDetailModal
            headerText={
              CHANGE_FOOD_PARTY_STATUS_MODAL_TEXT[foodPartyDetailStatusButtonText]
            }
            isOpen={isOpenCheckChangeStatusModal}
            onClose={onCloseCheckChangeStatusModal}
            onClickYesButton={handleChangeFoodPartyDetailStatusButton}
          />
          <FoodPartyDetailModal
            headerText='퇴장하시겠습니까?'
            isOpen={isOpenCheckExitModal}
            onClose={onCloseCheckExitModal}
            onClickYesButton={deleteFoodPartyMember}
          />
          <FoodPartyDetailModal
            headerText={`${foodPartyMemberWillBeKickedOut.nickname}님을 강퇴하시겠습니까?`}
            isOpen={isOpenCheckKickOutModal}
            onClose={onCloseCheckKickOutModal}
            onClickYesButton={() => {
              updateFoodPartyMember({
                memberId: foodPartyMemberWillBeKickedOut.memberId,
              });
            }}
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
