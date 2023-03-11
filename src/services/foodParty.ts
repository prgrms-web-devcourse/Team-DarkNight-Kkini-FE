import { axiosAuthApi } from 'apis/axios';
import { AxiosResponse } from 'axios';
import {
  FoodParty,
  FoodPartyCreateBody,
  FoodPartyDetail,
  FoodPartyLeaderReviewBody,
  FoodPartyMemberReviewBody,
  FoodPartyRevieweeType,
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
