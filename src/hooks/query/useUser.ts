import { useQuery } from '@tanstack/react-query';
import { fetchUser } from 'services/user';

// 1. query key 상수화 <- export 안함. 여기서만 쓸 것
const QUERY_KEY = {
  user: 'user',
};

// 2. custom hooks <- 외부에서 사용
const useGetUser = () => {
  return useQuery({
    queryKey: [QUERY_KEY.user],
    queryFn: fetchUser,
    // staleTime: 10000,
    suspense: true,
  });
};

export { useGetUser };
