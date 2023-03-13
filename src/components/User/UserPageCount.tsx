import { Flex, Text } from '@chakra-ui/react';

type MyPageCountProps = {
  name: string;
  value?: number;
};

const UserPageCount = ({ name, value }: MyPageCountProps) => {
  return (
    <Flex direction='column' align='center'>
      <Text fontWeight={600}>{name}</Text>
      <Text fontSize='lg'>{value}</Text>
    </Flex>
  );
};

export default UserPageCount;
