import { axiosApi, axiosAuthApi } from 'apis/axios';
import { FoodParty, FoodPartyCreateBody, Member } from 'types/foodParty';

type responseBodyType = {
  id: number;
};

type Comment = {
  commentId: number;
  userId: number;
  userName: string;
  avatarUrl: string;
  createdAt: number[];
  updatedAt: number[];
  content: string;
};

type FoodPartyDetail = {
  partyId: number;
  name: string;
  capacity: number;
  promiseTime: number[];
  categories: string[];
  members: Member[];
  comments: Comment[];
};

type FetchMyFoodPartyListResponse = {
  data: {
    responses: FoodParty[];
  };
};

type FetchFoodPartyDetailResponse = {
  data: FoodParty;
};

type FetchFoodPartyListResponse = {
  data: {
    responses: {
      content: FoodParty[];
    };
  };
};

export const createFoodParty = async (
  body: FoodPartyCreateBody
): Promise<responseBodyType> => {
  const response = await axiosAuthApi.post<responseBodyType>('/api/v1/crews', body);
  return response.data;
};

export const fetchMyFoodPartyList = async () => {
  const {
    data: {
      data: { responses: myFoodPartyList },
    },
  } = await axiosAuthApi<FetchMyFoodPartyListResponse>('/api/v1/crews/me');

  return myFoodPartyList;
};

export const fetchFoodPartyDetail = async (partyId: string) => {
  const {
    data: { data: foodPartyDetail },
  } = await axiosAuthApi<FetchFoodPartyDetailResponse>(`/api/v1/crews/${partyId}`);

  // return foodPartyDetail;
  return DUMMY_PARTY_DETAIL;
};

export const fetchFoodPartyList = async (placeId: string) => {
  const {
    data: {
      data: {
        responses: { content: foodPartyList },
      },
    },
  } = await axiosAuthApi<FetchFoodPartyListResponse>(`/api/v1/crews/${placeId}`, {
    params: {
      page: 1,
      size: 10,
    },
  });

  return foodPartyList;
};

// 아직 제대로 백엔드 API가 연결되지 않아 남겨둠.
// const DUMMY_PARTY_LIST = [
//   {
//     id: 1,
//     name: '햄최삼 모여라',
//     currentMember: 2,
//     capacity: 5,
//     promiseTime: [2023, 3, 14, 17, 50, 59, 893316700],
//     status: 'RECRUITING',
//     content: '맥도날드 더쿼파치 뿌수러 갈 사람!',
//     category: ['QUIET'],
//     members: [
//       {
//         userId: 1,
//         avatarUrl: 'https://bit.ly/ryan-florence',
//       },
//       {
//         userId: 2,
//         avatarUrl: 'https://bit.ly/sage-adebayo',
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: '라멘 뇸뇸뇸, 나가면 지상렬',
//     currentMember: 3,
//     capacity: 3,
//     promiseTime: [2023, 3, 3, 13, 30, 0, 893316700],
//     status: 'RECRUITING',
//     content: '식사 예절 좋으신 분만',
//     category: ['MANNERS MAKETH MAN'],
//     members: [
//       {
//         userId: 1,
//         avatarUrl: 'https://bit.ly/kent-c-dodds',
//       },
//       {
//         userId: 2,
//         avatarUrl: 'https://bit.ly/prosper-baba',
//       },
//       {
//         userId: 3,
//         avatarUrl: 'https://bit.ly/code-beast',
//       },
//     ],
//   },
// ];

const DUMMY_PARTY_DETAIL = {
  id: 2,
  name: '라멘 뇸뇸뇸, 나가면 지상렬',
  currentMember: 3,
  capacity: 5,
  status: 'RECRUITING',
  promiseTime: [2023, 3, 3, 13, 30, 0, 893316700],
  category: 'MANNERS MAKETH MAN',
  content: '쩝쩝이 사절',
  members: [
    {
      userId: 1,
      userName: 'hello',
      avatarUrl: 'https://bit.ly/kent-c-dodds',
      role: 'LEADER',
    },
    {
      userId: 2,
      userName: 'world',
      avatarUrl: 'https://bit.ly/prosper-baba',
      role: 'MEMBER',
    },
    {
      userId: 3,
      userName: 'developer',
      avatarUrl: 'https://bit.ly/code-beast',
      role: 'MEMBER',
    },
  ],
};
