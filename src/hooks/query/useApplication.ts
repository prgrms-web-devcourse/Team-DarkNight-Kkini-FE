import { useToast } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  changeApplicationStatus,
  fetchReceivedApplication,
  fetchSentApplication,
} from 'services/application';
import { ApplicationStatusChangePayload } from 'types/application';
import QUERY_KEYS from 'utils/constants/queryKeys';

export const useReceivedApplication = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.APPLICATION.RECEIVED],
    queryFn: fetchReceivedApplication,
    staleTime: 100,
  });
};

export const useSentApplication = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.APPLICATION.SENT],
    queryFn: fetchSentApplication,
    staleTime: 100,
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
  });
};
