import { axiosAuthApi } from 'apis/axios';
import { UserProfile } from 'types/auth';

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

type ApplicationStatus = '대기 중' | '승인' | '거절' | '미신청';

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
  const response = await axiosAuthApi.patch(`/api/v1/proposals/${applicationId}`, {
    proposalStatus: status,
  });
  return response.status === 200;
};
