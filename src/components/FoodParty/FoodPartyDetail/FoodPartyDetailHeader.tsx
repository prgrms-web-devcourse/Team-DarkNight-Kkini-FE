import { Divider, Flex, Heading, Stack } from '@chakra-ui/react';
import Category from 'components/common/Category';
import StatusBadge from 'components/common/StatusBadge';
import { FoodPartyStatus } from 'types/foodParty';

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
        <StatusBadge status={status} />
        <Category
          style={{
            padding: '2px 5px',
          }}>
          {category}
        </Category>
      </Stack>
      <Heading as='h1'>{foodPartyName}</Heading>
      <Divider />
    </Flex>
  );
};

export default FoodPartyDetailHeader;
