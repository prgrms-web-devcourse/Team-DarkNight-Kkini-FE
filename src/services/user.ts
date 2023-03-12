import { axiosAuthApi } from 'apis/axios';

type ProfileType = {
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
  const { data } = await axiosAuthApi.get<ProfileType>('/api/v1/user/me');
  return data.data;
};

export const fetchSpecificUser = async (userId: string) => {
  const { data } = await axiosAuthApi.get<ProfileType>(`api/v1/user/${userId}`);
  return data.data;
};
