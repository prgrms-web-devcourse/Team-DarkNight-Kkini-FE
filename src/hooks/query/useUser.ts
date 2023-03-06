import { useQuery } from '@tanstack/react-query';
import { fetchUser } from 'services/user';
import { QUERY_KEY_USER } from 'utils/constants/queryKeys';

// custom hooks(컴포넌트에 바인딩해서 사용)
const useGetUser = () => {
  return useQuery({
    queryKey: [QUERY_KEY_USER.user],
    queryFn: fetchUser,
    staleTime: 10000,
    suspense: true,
    refetchOnWindowFocus: false,
  });
};

export { useGetUser };
