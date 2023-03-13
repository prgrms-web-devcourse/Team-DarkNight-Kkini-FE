import { useToast } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import {
  fetchSpecificUser,
  fetchUser,
  updateUserProfile,
  UserUpdateProfileType,
} from 'services/user';
import { updateUserImage } from 'services/user';
import QUERY_KEYS from 'utils/constants/queryKeys';

// custom hooks(컴포넌트에 바인딩해서 사용)
export const useGetUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.USER.MY_INFO],
    queryFn: fetchUser,
    staleTime: 10000,
    // suspense: true,
    refetchOnWindowFocus: false,
  });
};

export const useGetSpecificUser = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.USER.USER_INFO, userId],
    queryFn: () => fetchSpecificUser(userId),
  });
};

export const useUpdateUserImage = () => {
  return useMutation({
    mutationFn: (body: FormData) => updateUserImage(body),
  });
};

export const useUpdateUserProfile = (userId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();

  return useMutation({
    mutationFn: (body: UserUpdateProfileType) => updateUserProfile(body),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.USER.USER_INFO, userId]);
      router.push(`/user/${userId}`);
      toast({
        title: '정보 수정이 완료되었습니다!',
        description: '바뀐정보를 확인해주세요',
        position: 'top',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    },
  });
};
