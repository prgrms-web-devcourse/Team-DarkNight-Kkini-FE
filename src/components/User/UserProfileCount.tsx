import { Flex, Text } from '@chakra-ui/react';

type UserProfileCountProps = {
  name: string;
  value?: number;
};

const UserProfileCount = ({ name, value }: UserProfileCountProps) => {
  return (
    <Flex direction='column' align='center'>
      <Text fontWeight={600}>{name}</Text>
      <Text fontSize='lg'>{value}</Text>
    </Flex>
  );
};

export default UserProfileCount;
