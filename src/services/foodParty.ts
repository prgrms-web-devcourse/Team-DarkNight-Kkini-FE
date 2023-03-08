import { axiosAuthApi } from 'apis/axios';
import { FoodPartyCreateBody } from 'types/foodParty';
type responseBodyType = {
  id: number;
};
export const createFoodParty = async (
  body: FoodPartyCreateBody
): Promise<responseBodyType> => {
  const response = await axiosAuthApi.post<responseBodyType>('/api/v1/crews', body);
  return response.data;
};
