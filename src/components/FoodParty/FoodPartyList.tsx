import { Flex, Text } from '@chakra-ui/react';
import { FoodParty } from 'types/foodParty';

import FoodPartyListItem from './FoodPartyListItem';

type FoodPartyListProps = {
  foodPartyList: FoodParty[];
  onClickViewButton: (partyId: number) => void;
  onClickReviewButton?: (partyId: number) => void;
};

const FoodPartyList = ({
  foodPartyList,
  onClickViewButton,
  onClickReviewButton,
}: FoodPartyListProps) => {
  return (
    <>
      {!foodPartyList.length ? (
        // To Do: 스타일링 by 승준
        <Text>밥모임이 없어요..!</Text>
      ) : (
        <Flex flexDirection='column'>
          {foodPartyList?.map((party) => (
            <FoodPartyListItem
              key={party.id}
              party={party}
              onClickViewButton={onClickViewButton}
              onClickReviewButton={onClickReviewButton}
            />
          ))}
        </Flex>
      )}
    </>
  );
};

export default FoodPartyList;
