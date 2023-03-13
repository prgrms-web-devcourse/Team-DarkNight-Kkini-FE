export const isMyProfile = (myUserId: number | undefined, profileUserId: string) => {
  return myUserId && myUserId === parseInt(profileUserId);
};
