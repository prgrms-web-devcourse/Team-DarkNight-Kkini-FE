import { axiosAuthApi } from 'apis/axios';

type UserProfileType = {
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

type UserImageType = {
  key: string;
  path: string;
};

export type UserUpdateProfileType = {
  nickName?: string;
  profileImgUrl?: string;
  introduction?: string;
};

export const fetchUser = async () => {
  const { data } = await axiosAuthApi.get<UserProfileType>('/api/v1/user/me');
  return data.data;
};

export const fetchSpecificUser = async (userId: string) => {
  const { data } = await axiosAuthApi.get<UserProfileType>(`api/v1/user/${userId}`);
  return data.data;
};

export const updateUserImage = async (body: FormData) => {
  const { data } = await axiosAuthApi.post<UserImageType>('/api/v1/s3/resource', body);

  return data;
};

export const updateUserProfile = async (body: UserUpdateProfileType) => {
  const { data } = await axiosAuthApi.put<UserProfileType>('/api/v1/user/me', body);

  return data;
};
