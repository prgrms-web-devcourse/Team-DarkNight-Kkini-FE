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
import StatusBadge from 'components/common/StatusBadge';
import { FoodParty } from 'types/foodParty';
import { templatePromiseDate, templatePromiseTime } from 'utils/helpers/foodParty';

const DEFAULT_AVATAR_GROUP_MAX_VALUE = 3;

type FoodPartyListItemProps = {
  party: FoodParty;
  onClickViewButton: (partyId: number) => void;
  onClickReviewButton?: (partyId: number) => void;
};

const FoodPartyListItem = ({
  party,
  onClickViewButton,
  onClickReviewButton,
}: FoodPartyListItemProps) => {
  const [year, month, day, hour, minute] = party.promiseTime;

  return (
    // To Do: ellipsis 처리 by 승준
    <Flex
      flexDirection='column'
      padding='1.5rem'
      borderRadius='1rem'
      border='1px solid #e2e5e6'
      marginBottom='1rem'>
      <Flex flexDirection='column' gap='0.5rem'>
        <Stack direction='row'>
          <StatusBadge status={party.crewStatus} />
          <Category
            style={{
              padding: '2px 5px',
            }}>
            {party.category}
          </Category>
        </Stack>
        <Text>{party.name}</Text>
        <Flex justifyContent='space-between'>
          <Text>
            {templatePromiseDate(year, month, day)} {templatePromiseTime(hour, minute)}
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
        <Flex alignItems='center' gap='0.5rem'>
          {party.crewStatus === '식사 완료' && (
            <Button
              onClick={() => {
                onClickReviewButton && onClickReviewButton(party.id);
              }}
              fontWeight='semibold'
              fontSize='14px'>
              리뷰하기
            </Button>
          )}
          <Button
            onClick={() => {
              onClickViewButton(party.id);
            }}
            fontWeight='semibold'
            fontSize='14px'>
            보기
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default FoodPartyListItem;
