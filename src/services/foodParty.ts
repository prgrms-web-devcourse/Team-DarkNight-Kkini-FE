import { axiosApi, axiosAuthApi } from 'apis/axios';
import { AxiosResponse } from 'axios';
import {
  FoodParty,
  FoodPartyCreateBody,
  FoodPartyDetail,
  FoodPartyLeaderReviewBody,
  FoodPartyMemberReviewBody,
  FoodPartyRevieweeType,
  FoodPartyStatus,
  Message,
  NearFoodPartyItem,
  NearFoodPartyProps,
} from 'types/foodParty';

type responseBodyType = {
  id: number;
};

type FetchMyFoodPartyListResponse = {
  data: {
    responses: FoodParty[];
  };
};

type FetchFoodPartyDetailResponse = {
  data: FoodPartyDetail;
};

type FetchFoodPartyListResponse = {
  data: {
    responses: {
      content: FoodParty[];
    };
  };
};

type FetchFoodPartyRevieweeResponse = {
  data: FoodPartyRevieweeType[];
};

type NearFoodPartyResponse = {
  data: {
    responses: NearFoodPartyItem[];
  };
};

type FetchFoodPartyMessageList = {
  data: {
    chats: Message[];
  };
};

export const createFoodParty = async (
  body: FoodPartyCreateBody
): Promise<responseBodyType> => {
  const response = await axiosAuthApi.post<responseBodyType>('/api/v1/crews', body);
  return response.data;
};

export const fetchMyFoodPartyList = async () => {
  const {
    data: {
      data: { responses: myFoodPartyList },
    },
  } = await axiosAuthApi<FetchMyFoodPartyListResponse>('/api/v1/crews/me');

  return myFoodPartyList;
};

export const fetchFoodPartyDetail = async (partyId: string) => {
  const {
    data: { data: foodPartyDetail },
  } = await axiosAuthApi<FetchFoodPartyDetailResponse>(`/api/v1/crews/${partyId}`);

  return foodPartyDetail;
};

export const fetchFoodPartyList = async (placeId: string) => {
  const {
    data: {
      data: {
        responses: { content: foodPartyList },
      },
    },
  } = await axiosAuthApi<FetchFoodPartyListResponse>(`/api/v1/crews/page/${placeId}`, {
    params: {
      page: 0,
      size: 10,
    },
  });

  return foodPartyList;
};

export const fetchFoodPartyReviewees = async (partyId: string) => {
  const {
    data: { data: foodPartyReviewees },
  } = await axiosAuthApi<FetchFoodPartyRevieweeResponse>(
    `api/v1/crews/${partyId}/reviews`
  );

  return foodPartyReviewees;
};

export const fetchFoodPartyMessageList = async (roomId: string) => {
  const {
    data: {
      data: { chats: messageList },
    },
  } = await axiosAuthApi<FetchFoodPartyMessageList>(`/api/v1/crews/${roomId}/chats`);

  return messageList;
};

export const postFoodPartyLeaderReview = async (
  crewId: string,
  body: FoodPartyLeaderReviewBody
): Promise<AxiosResponse> => {
  const response = await axiosAuthApi.post<AxiosResponse>(
    `/api/v1/crews/${crewId}/reviews/leader`,
    body
  );
  return response;
};

export const postFoodPartyMemberReview = async (
  crewId: string,
  body: FoodPartyMemberReviewBody
) => {
  const response = await axiosAuthApi.post(
    `/api/v1/crews/${crewId}/reviews/member`,
    body
  );
  return response;
};

export const createFoodPartyApplication = async (
  partyId: string,
  content: string,
  leaderUserId: number
): Promise<{ id: number }> => {
  const response = await axiosAuthApi.post<{ id: number }>(
    `/api/v1/crews/${partyId}/proposals`,
    {
      leaderId: leaderUserId,
      content,
    }
  );
  return response.data;
};

export const updateFoodPartyStatus = async (partyId: string, status: FoodPartyStatus) => {
  await axiosAuthApi.patch(`/api/v1/crews/${partyId}`, {
    crewStatus: status,
  });
};

export const fetchNearFoodPartyList = async ({
  latitude,
  longitude,
  distance,
}: NearFoodPartyProps) => {
  const {
    data: {
      data: { responses },
    },
  } = await axiosApi.get<NearFoodPartyResponse>('/api/v1/crews', {
    params: { latitude, longitude, distance },
  });

  return responses;
};
