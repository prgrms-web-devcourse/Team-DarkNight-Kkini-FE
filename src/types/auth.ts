export type Token = {
  accessToken: string;
};

export type UserProfile = {
  id: number;
  nickname: string;
  profileImgUrl: string;
  introduction: string;
  leaderCount: number;
  crewCount: number;
  tasteScore: number;
  mannerScore: number;
};
