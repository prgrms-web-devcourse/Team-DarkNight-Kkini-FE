import { useToast } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  changeApplicationStatus,
  fetchReceivedApplication,
  fetchSentApplication,
} from 'services/application';
import { ApplicationStatusChangePayload } from 'types/application';
import QUERY_KEYS from 'utils/constants/queryKeys';

export const useReceivedApplication = (userId: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.APPLICATION.RECEIVED, userId],
    queryFn: fetchReceivedApplication,
    suspense: true,
  });
};

export const useSentApplication = (userId: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.APPLICATION.SENT, userId],
    queryFn: fetchSentApplication,
    suspense: true,
  });
};

export const useChangeApplicationStatus = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: ({
      applicationId,
      status,
      closeApplicationDrawer,
    }: ApplicationStatusChangePayload) => {
      closeApplicationDrawer();
      return changeApplicationStatus(applicationId, status);
    },
    onSuccess: () => {
      toast({
        title: `신청서가 처리 되었습니다`,
        position: 'top',
        status: 'success',
        duration: 1500,
        isClosable: true,
      });
      queryClient.invalidateQueries([QUERY_KEYS.APPLICATION.RECEIVED]);
    },
    onError: (errorMessage: string) => {
      toast({
        title: errorMessage,
        position: 'top',
        status: 'error',
        duration: 1500,
        isClosable: true,
      });
    },
  });
};
