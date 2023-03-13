import { Flex, Text } from '@chakra-ui/react';

type UserPageCountProps = {
  name: string;
  value?: number;
};

const UserPageCount = ({ name, value }: UserPageCountProps) => {
  return (
    <Flex direction='column' align='center'>
      <Text fontWeight={600}>{name}</Text>
      <Text fontSize='lg'>{value}</Text>
    </Flex>
  );
};

export default UserPageCount;
