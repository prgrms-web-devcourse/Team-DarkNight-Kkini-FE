import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import { Member } from 'types/foodParty';

import FoodPartyMemberItem from './FoodPartyMemberItem';

type FoodPartyMemeberListProps = {
  ableToKickOut: boolean;
  onClickChatButton?: () => void;
  memberList: Member[];
  capacity: number;
};

const FoodPartyMemberList = ({
  ableToKickOut,
  onClickChatButton,
  memberList,
  capacity,
}: FoodPartyMemeberListProps) => {
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
      <Flex flexDirection='column' gap='0.5rem' height='160px' overflowY='auto'>
        {memberList.map((member) => (
          <FoodPartyMemberItem
            key={member.userId}
            ableToKickOut={ableToKickOut}
            member={member}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default FoodPartyMemberList;
