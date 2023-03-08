import {
  Avatar,
  AvatarGroup,
  Button,
  Divider,
  Flex,
  Stack,
  Text,
} from '@chakra-ui/react';
import Category from 'components/common/Category';
import { FoodParty } from 'types/foodParty';

const DEFAULT_AVATAR_GROUP_MAX_VALUE = 3;

const FoodPartyListItem = ({
  party,
  onClick,
}: {
  party: FoodParty;
  onClick: (partyId: number) => void;
}) => {
  const [year, month, day, hour, minute] = party.promiseTime;

  return (
    // ellipsis 처리 by 승준
    <Flex
      flexDirection='column'
      padding='1.5rem'
      borderRadius='1rem'
      border='1px solid #e2e5e6'
      marginBottom='1rem'>
      <Flex flexDirection='column' gap='0.5rem'>
        <Stack direction='row'>
          <Category>{party.status}</Category>
        </Stack>
        <Text>{party.name}</Text>
        <Flex justifyContent='space-between'>
          <Text>
            {year}-{month}-{day} {hour}:{minute}
          </Text>
          <Text>
            {party.currentMember} / {party.capacity}
          </Text>
        </Flex>
      </Flex>
      <Divider margin='1rem 0' />
      <Flex justifyContent='space-between' alignItems='center'>
        <AvatarGroup size='sm' max={DEFAULT_AVATAR_GROUP_MAX_VALUE}>
          {party.members.map((member) => (
            <Avatar key={member.userId} src={member.profileImgUrl} />
          ))}
        </AvatarGroup>
        <Button
          onClick={() => {
            onClick(party.id);
          }}>
          View
        </Button>
      </Flex>
    </Flex>
  );
};

export default FoodPartyListItem;
