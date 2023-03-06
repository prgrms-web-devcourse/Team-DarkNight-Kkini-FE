import { axiosAuthApi } from 'apis/axios';

type MyProfileType = {
  data: {
    id: number;
    nickname: string;
    profileImgUrl: string;
    introduction: string;
    leaderCount: number;
    crewCount: number;
    tasteScore: number;
    mannerScore: number;
  };
};

export const fetchUser = async () => {
  const { data } = await axiosAuthApi.get<MyProfileType>('/api/v1/user/me');
  return data.data;
};
