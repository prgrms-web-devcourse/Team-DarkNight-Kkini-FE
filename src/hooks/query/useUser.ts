import { useToast } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { dropOut } from 'services/auth';
import {
  fetchSpecificUser,
  fetchUser,
  updateUserProfile,
  UserUpdateProfileType,
} from 'services/user';
import { updateUserImage } from 'services/user';
import QUERY_KEYS from 'utils/constants/queryKeys';
import ROUTING_PATHS from 'utils/constants/routingPaths';

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

export const useGetSpecificUser = (userId: string | number) => {
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

export const useUpdateMyProfile = (userId: string | number) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();

  return useMutation({
    mutationFn: (body: UserUpdateProfileType) => updateUserProfile(body),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.USER.MY_INFO]);
      router.push(ROUTING_PATHS.USER.PROFILE(userId));
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

export const useDropOut = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: () => dropOut(),
    onSuccess: () => {
      toast({
        title: '회원 탈퇴되었습니다',
        position: 'top',
        status: 'success',
        duration: 1500,
        isClosable: true,
      });
      window.location.replace(ROUTING_PATHS.HOME);
    },
    onError: () => {
      toast({
        title: '회원 탈퇴에 실패했습니다. 다시 시도해주세요.',
        position: 'top',
        status: 'error',
        duration: 1500,
        isClosable: true,
      });
    },
  });
};
