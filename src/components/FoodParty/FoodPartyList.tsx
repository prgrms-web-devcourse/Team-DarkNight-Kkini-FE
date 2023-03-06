import { Flex } from '@chakra-ui/react';
import { FoodParty } from 'types/foodParty';

import FoodPartyListItem from './FoodPartyListItem';

const FoodPartyList = ({
  foodPartyList,
  onClick,
}: {
  foodPartyList: FoodParty[];
  onClick: (partyId: number) => void;
}) => {
  return (
    <Flex flexDirection='column'>
      {foodPartyList?.map((party) => (
        <FoodPartyListItem key={party.id} party={party} onClick={onClick} />
      ))}
    </Flex>
  );
};

export default FoodPartyList;
