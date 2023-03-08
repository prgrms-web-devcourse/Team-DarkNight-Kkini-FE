import { useQuery } from '@tanstack/react-query';
import { fetchRestaurant } from 'services/restaurant';
import QUERY_KEYS from 'utils/constants/queryKeys';

export const useGetRestaurant = (storeId: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.RESTAURANT.RESTAURANT_INFORMATION, storeId],
    queryFn: () => fetchRestaurant(storeId),
  });
};
