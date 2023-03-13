import { Box, Flex, Text } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

type UserPageItemProps = {
  name: string;
} & PropsWithChildren;

const UserPageItem = ({ name, children }: UserPageItemProps) => {
  return (
    <Flex h='5rem' direction='column' gap='0.5rem' mt='1rem'>
      <Text fontWeight={600} fontSize='lg'>
        {name}
      </Text>
      <Box>{children}</Box>
    </Flex>
  );
};

export default UserPageItem;
