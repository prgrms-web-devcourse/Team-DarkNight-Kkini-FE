import { useToast } from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import {
  createFoodParty,
  fetchFoodPartyDetail,
  fetchMyFoodPartyList,
} from 'services/foodParty';
import QUERY_KEYS from 'utils/constants/queryKeys';

export const useCreateFoodParty = () => {
  const router = useRouter();
  const toast = useToast();
  return useMutation({
    mutationFn: createFoodParty,
    onSuccess: (data) => {
      const partyId = data.id;
      router.push(`/food-party/detail/${partyId}`);
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

export const useGetFoodPartyDetail = (partyId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.FOOD_PARTY.FOOD_PARTY_DETAIL, partyId],
    queryFn: () => fetchFoodPartyDetail(partyId),
  });
};

// export const useGetSearchedFoodPartyList = () => {
//   return useQuery({
//     queryKey: [],
//     queryFn:
//   })
// }
