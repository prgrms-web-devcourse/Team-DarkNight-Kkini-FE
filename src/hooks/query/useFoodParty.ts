import { useToast } from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import {
  createFoodParty,
  fetchFoodPartyDetail,
  fetchFoodPartyList,
  fetchMyFoodPartyList,
} from 'services/foodParty';
import QUERY_KEYS from 'utils/constants/queryKeys';
import ROUTING_PATHS from 'utils/constants/routingPaths';

export const useCreateFoodParty = () => {
  const router = useRouter();
  const toast = useToast();
  return useMutation({
    mutationFn: createFoodParty,
    onSuccess: (data) => {
      const partyId = data.id;
      router.push(ROUTING_PATHS.FOOD_PARTY.DETAIL(partyId));
      toast({
        title: '밥모임이 생성되었습니다!',
        description: '생성된 밥모임 정보를 확인하세요',
        position: 'top',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    },
  });
};

export const useGetMyFoodPartyList = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.FOOD_PARTY.MY_FOOD_PARTY_LIST],
    queryFn: () => fetchMyFoodPartyList(),
  });
};

export const useGetFoodPartyDetail = (partyId: string, userId?: number) => {
  const result = useQuery({
    queryKey: [QUERY_KEYS.FOOD_PARTY.FOOD_PARTY_DETAIL, partyId],
    queryFn: () => fetchFoodPartyDetail(partyId),
  });
  const isLeader = !!result.data?.members.find(
    ({ userId: memberUserId, crewMemberRole }) =>
      memberUserId === userId && crewMemberRole === 'LEADER'
  );
  const isMember = !!result.data?.members.find(
    ({ userId: memberUserId, crewMemberRole }) =>
      memberUserId === userId && crewMemberRole === 'MEMBER'
  );
  const isFull = result.data?.currentMember === result.data?.capacity;

  return {
    ...result,
    isLeader,
    isMember,
    isFull,
  };
};

export const useGetSearchedFoodPartyList = (placeId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.FOOD_PARTY.SEARCHED_FOOD_PARTY_LIST, placeId],
    queryFn: () => fetchFoodPartyList(placeId),
  });
};
