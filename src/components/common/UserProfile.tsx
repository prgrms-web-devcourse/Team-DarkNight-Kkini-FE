import { Avatar, Flex, Text } from '@chakra-ui/react';
import { useGetUser } from 'hooks/query/useUser';
import { useRouter } from 'next/router';
import ROUTING_PATHS from 'utils/constants/routingPaths';

const UserProfile = () => {
  const { data } = useGetUser();
  const router = useRouter();

  const handleClickUserIcon = () => {
    if (data && data.id) {
      router.push(ROUTING_PATHS.USER.PROFILE(data.id));
    }
  };

  return (
    <Flex alignItems='center'>
      <Flex fontWeight='600'>
        <Text color='primary'>맛에 진심인, </Text>
        <Text marginLeft='0.25rem'>{data?.nickname}</Text>
      </Flex>
      <Avatar
        src={data?.profileImgUrl}
        size='sm'
        marginLeft='0.7rem'
        onClick={handleClickUserIcon}
      />
    </Flex>
  );
};

export default UserProfile;
