import { axiosAuthApi } from 'apis/axios';
import { isAxiosError } from 'axios';
import { UserProfile } from 'types/auth';
import { BackendErrorResponse } from 'types/error';
import { ERROR_CODE } from 'utils/constants/errorCode';

export type ApplicationItemType = {
  id: number;
  user: UserProfile;
  leaderId: number;
  crewId: number;
  content: string;
  status: ApplicationStatus;
  storeName: string;
  crewName: string;
};

export type ApplicationStatus = '대기 중' | '승인' | '거절' | '미신청';

type ApplicationResponse = {
  data: {
    responses: ApplicationItemType[];
  };
};

export const fetchReceivedApplication = async () => {
  const {
    data: {
      data: { responses },
    },
  } = await axiosAuthApi.get<ApplicationResponse>('/api/v1/proposals/leader');
  return responses;
};

export const fetchSentApplication = async () => {
  const {
    data: {
      data: { responses },
    },
  } = await axiosAuthApi.get<ApplicationResponse>('/api/v1/proposals/member');
  return responses;
};

export const changeApplicationStatus = async (applicationId: number, status: string) => {
  try {
    const response = await axiosAuthApi.patch(`/api/v1/proposals/${applicationId}`, {
      proposalStatus: status,
    });
    return response.status === 200;
  } catch (error) {
    if (isAxiosError<BackendErrorResponse>(error)) {
      if (error.response?.data.code === ERROR_CODE.FOOD_PARTY_OVER_CAPACITY) {
        throw error.response.data.message;
      }
    }
  }
};
