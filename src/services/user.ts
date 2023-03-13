import { axiosAuthApi } from 'apis/axios';
import { UserProfile } from 'types/auth';

type UserProfileResponse = {
  data: UserProfile;
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
  const { data } = await axiosAuthApi.get<UserProfileResponse>('/api/v1/user/me');
  return data.data;
};

export const fetchSpecificUser = async (userId: string | number) => {
  const { data } = await axiosAuthApi.get<UserProfileResponse>(`api/v1/user/${userId}`);
  return data.data;
};

export const updateUserImage = async (body: FormData) => {
  const { data } = await axiosAuthApi.post<UserImageType>('/api/v1/s3/resource', body);

  return data;
};

export const updateUserProfile = async (body: UserUpdateProfileType) => {
  const { data } = await axiosAuthApi.put<UserProfileResponse>('/api/v1/user/me', body);

  return data;
};
