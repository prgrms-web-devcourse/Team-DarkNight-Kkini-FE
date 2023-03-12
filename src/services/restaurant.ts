import { axiosApi } from 'apis/axios';
import { Restaurant } from 'types/restaurant';

export const fetchRestaurantDetail = async (storeId: number) => {
  const {
    data: { data },
  } = await axiosApi.get<{ data: Restaurant }>(`/api/v1/stores/${storeId}`);
  return data;
};
