import { axiosAuthApi } from 'apis/axios';
import { CreateFoodPartyBody } from 'types/foodParty';
type responseBodyType = {
  id: number;
};
export const createFoodParty = async (
  body: CreateFoodPartyBody
): Promise<responseBodyType> => {
  const response = await axiosAuthApi.post<responseBodyType>('/api/v1/crews', body);
  return response.data;
};
