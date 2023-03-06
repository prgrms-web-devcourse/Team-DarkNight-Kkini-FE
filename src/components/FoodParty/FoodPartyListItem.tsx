import { Avatar, AvatarGroup, Flex, Text } from '@chakra-ui/react';
import { FoodParty } from 'types/foodParty';

const FoodPartyListItem = ({
  party,
  onClick,
}: {
  party: FoodParty;
  onClick: (partyId: number) => void;
}) => {
  return (
    <Flex
      onClick={() => {
        onClick(party.id);
      }}
      alignItems='center'
      justifyContent='space-between'
      cursor='pointer'
      padding='1rem'
      borderRadius='1rem'
      border='1px solid #e2e5e6'
      marginBottom='1rem'
      key={party.id}>
      <Flex flexDirection='column'>
        {/* To Do: ellipsis 처리 by 승준 */}
        <Text>{party.name}</Text>
        <Text>{party.content}</Text>
      </Flex>
      <Flex flexDirection='column' alignItems='flex-end'>
        {party.currentStaff} / {party.capacity}
        <AvatarGroup size='xs' max={2}>
          {party.avatarUrls.map((avatarUrl) => (
            <Avatar key={avatarUrl} src={avatarUrl} />
          ))}
        </AvatarGroup>
      </Flex>
    </Flex>
  );
};

export default FoodPartyListItem;
