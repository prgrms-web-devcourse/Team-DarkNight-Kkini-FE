import { axiosAuthApi } from 'apis/axios';

// fake api - test용
// axios
export const fetchUser = async () => {
  return await new Promise<{ userImage: string }>((resolve) => {
    setTimeout(() => {
      console.log(`working...`);
      resolve({
        userImage: 'https://via.placeholder.com/150/92c952',
      });
    }, 5000);
  });
};
