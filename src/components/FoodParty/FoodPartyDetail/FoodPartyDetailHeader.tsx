import { Divider, Flex, Heading, Stack } from '@chakra-ui/react';
import Category from 'components/common/Category';

type FoodPartyDetailHeaderProps = {
  status: string;
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
        <Category>{status}</Category>
        <Category>{category}</Category>
      </Stack>
      <Heading as='h1'>{foodPartyName}</Heading>
      <Divider />
    </Flex>
  );
};

export default FoodPartyDetailHeader;
