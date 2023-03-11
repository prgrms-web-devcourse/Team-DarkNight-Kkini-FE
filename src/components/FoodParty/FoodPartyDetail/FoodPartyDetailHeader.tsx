import { Divider, Flex, Heading, Stack } from '@chakra-ui/react';
import Category from 'components/common/Category';
import { FoodPartyStatus } from 'types/foodParty';

import FoodPartyDetailStatusCategory from './FoodPartyDetailStatusCategory';

type FoodPartyDetailHeaderProps = {
  status: FoodPartyStatus;
  category: string;
  foodPartyName: string;
};

const FoodPartyDetailHeader = ({
  status,
  category,
  foodPartyName,
}: FoodPartyDetailHeaderProps) => {
  return (
    <Flex flexDirection='column' gap='0.5rem'>
      <Stack direction='row'>
        <FoodPartyDetailStatusCategory status={status} />
        <Category>{category}</Category>
      </Stack>
      <Heading as='h1'>{foodPartyName}</Heading>
      <Divider />
    </Flex>
  );
};

export default FoodPartyDetailHeader;
