import { Flex, Text } from '@chakra-ui/react';
import { FoodParty, FoodPartyStatus } from 'types/foodParty';

import FoodPartyListItem from './FoodPartyListItem';

type FoodPartyListProps = {
  foodPartyList: FoodParty[];
  onClick: (partyId: number) => void;
};

const FoodPartyList = ({ foodPartyList, onClick }: FoodPartyListProps) => {
  return (
    <>
      {foodPartyList.length === 0 ? (
        <Text>
          아직 밥모임에 참여해보신 적이 없으시군요, 직접 밥모임을 생성해볼까요!?
        </Text>
      ) : (
        <Flex flexDirection='column'>
          {foodPartyList?.map((party) => (
            <FoodPartyListItem key={party.id} party={party} onClick={onClick} />
          ))}
        </Flex>
      )}
    </>
  );
};

export default FoodPartyList;
