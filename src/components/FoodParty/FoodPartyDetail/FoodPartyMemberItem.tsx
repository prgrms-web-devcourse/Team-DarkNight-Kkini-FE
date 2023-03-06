import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import { Member } from 'types/foodParty';

const FoodPartyMemberItem = ({ member }: { member: Member }) => {
  return (
    <Box position='relative' padding='0.5rem 0'>
      <Flex alignItems='center'>
        <Avatar src={member.avatarUrl} />
        <Text>{member.userName}</Text>
      </Flex>
    </Box>
  );
};

export default FoodPartyMemberItem;
