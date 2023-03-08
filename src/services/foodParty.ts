import { axiosAuthApi } from 'apis/axios';
import { FoodParty, FoodPartyCreateBody, FoodPartyDetail } from 'types/foodParty';

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
  } = await axiosAuthApi<FetchFoodPartyListResponse>(`/api/v1/crews/${placeId}`, {
    params: {
      page: 1,
      size: 10,
    },
  });

  return foodPartyList;
};
