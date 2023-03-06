type Member = {
  userId: number;
  avatarUrl: string;
};

export type FoodParty = {
  id: number;
  name: string;
  currentStaff: number;
  capacity: number;
  promiseTime: number[];
  status: string;
  content: string;
  category: string[];
  members: Member[];
};
