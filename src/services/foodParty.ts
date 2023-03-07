import { axiosAuthApi } from 'apis/axios';
import { CreateFoodPartyBody } from 'types/foodParty';
export const createFoodParty = async (
  body: CreateFoodPartyBody
): Promise<CreateFoodPartyBody> => {
  const { data } = await axiosAuthApi.post<CreateFoodPartyBody>('/api/v1/crews', body);
  return data;
};
