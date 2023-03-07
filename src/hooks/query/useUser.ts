import { useQuery } from '@tanstack/react-query';
import { fetchUser } from 'services/user';
import QUERY_KEYS from 'utils/constants/queryKeys';

// custom hooks(컴포넌트에 바인딩해서 사용)
export const useGetUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.USER.MY_INFO],
    queryFn: fetchUser,
    staleTime: 10000,
    suspense: true,
    refetchOnWindowFocus: false,
  });
};
