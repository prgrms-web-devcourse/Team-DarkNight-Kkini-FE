import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import { Member } from 'types/foodParty';

import FoodPartyMemberItem from './FoodPartyMemberItem';

const FoodPartyMemberList = ({
  onClickChatButton,
  memberList,
  capacity,
}: {
  onClickChatButton?: () => void;
  memberList: Member[];
  capacity: number;
}) => {
  return (
    <Flex flexDirection='column'>
      <Flex justifyContent='space-between' alignItems='center'>
        <Flex alignItems='center' gap='0.5rem'>
          <Heading as='h2' size='md' margin='1rem 0'>
            끼니원들
          </Heading>
          <Text fontSize='sm'>
            {memberList.length} / {capacity}
          </Text>
        </Flex>
        {onClickChatButton && <Button onClick={onClickChatButton}>채팅방</Button>}
      </Flex>
      <Flex flexDirection='column' gap='0.5rem' height='240px' overflowY='auto'>
        {memberList.map((member) => (
          <FoodPartyMemberItem key={member.userId} member={member} />
        ))}
      </Flex>
    </Flex>
  );
};

export default FoodPartyMemberList;
