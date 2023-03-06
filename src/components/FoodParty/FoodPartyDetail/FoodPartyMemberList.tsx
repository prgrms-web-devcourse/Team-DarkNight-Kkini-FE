import { Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { Member } from 'types/foodParty';

import FoodPartyMemberItem from './FoodPartyMemberItem';

const FoodPartyMemberList = ({
  memberList,
  capacity,
}: {
  memberList: Member[];
  capacity: number;
}) => {
  return (
    <Flex flexDirection='column'>
      <Flex alignItems='center' gap='0.5rem'>
        <Heading as='h2' size='md' margin='1rem 0'>
          끼니원들
        </Heading>
        <Text fontSize='sm'>
          {capacity} / {memberList.length}
        </Text>
      </Flex>
      <Flex flexDirection='column' gap='0.5rem'>
        {memberList.map((member) => (
          <FoodPartyMemberItem key={member.userId} member={member} />
        ))}
      </Flex>
    </Flex>
  );
};

export default FoodPartyMemberList;
