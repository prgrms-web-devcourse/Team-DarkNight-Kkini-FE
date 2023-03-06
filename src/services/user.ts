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

const dummyData: MyProfileType = {
  data: {
    id: 512,
    nickname: '수화',
    profileImgUrl: 'https://via.placeholder.com/150/92c952',
    introduction: '자기소개를 작성해주세요',
    leaderCount: 0,
    crewCount: 0,
    tasteScore: 0,
    mannerScore: 36.5,
  },
};

export const fetchUser = async () => {
  // TODO: CORS에러 해결되면, api 연결해야함
  // const { data } = await axiosAuthApi.get<MyProfileType>('/api/v1/user/me');
  const { data } = await new Promise<MyProfileType>((resolve) => {
    setTimeout(() => {
      resolve(dummyData);
    }, 1000);
  });

  return data;
};
