import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { createFoodParty } from 'services/foodParty';

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
