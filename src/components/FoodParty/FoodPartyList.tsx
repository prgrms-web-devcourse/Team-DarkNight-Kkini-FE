import { Button, Flex, Text } from '@chakra-ui/react';
import { FoodParty } from 'types/foodParty';

import FoodPartyListItem from './FoodPartyListItem';

type FoodPartyListProps = {
  foodPartyList: FoodParty[];
  onClickViewButton: (partyId: number) => void;
  onClickReviewButton?: (partyId: number) => void;
  onClickCreateFoodPartyButton?: () => void;
};

const FoodPartyList = ({
  foodPartyList,
  onClickViewButton,
  onClickReviewButton,
  onClickCreateFoodPartyButton,
}: FoodPartyListProps) => {
  return (
    <>
      {!foodPartyList.length ? (
        // To Do: 스타일링 by 승준
        <Flex
          flexDirection='column'
          position='absolute'
          alignItems='center'
          gap='1rem'
          top='50%'
          left='50%'
          transform='translate(-50%, -50%)'>
          <Text>밥모임이 없어요..!</Text>
          {onClickCreateFoodPartyButton && (
            <Button onClick={onClickCreateFoodPartyButton}>밥모임 생성하러 가기</Button>
          )}
        </Flex>
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
