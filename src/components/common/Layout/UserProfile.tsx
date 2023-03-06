import { Avatar } from '@chakra-ui/react';
import { useGetUser } from 'hooks/query/useUser';

const UserProfile = () => {
  const { data } = useGetUser();

  return <Avatar src={data?.userImage} width='35' height='35' />;
};

export default UserProfile;
