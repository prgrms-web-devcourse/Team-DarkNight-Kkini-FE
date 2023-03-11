import { Button } from '@chakra-ui/react';
import {
  FoodPartyDetailStatusButtonText,
  FoodPartyStatus,
  ProposalStatus,
} from 'types/foodParty';
import {
  checkButtonTextIsDisabled,
  getFoodPartyDetailStatusButtonText,
} from 'utils/helpers/foodParty';

type FoodPartyDetailStatusButtonProps = {
  applied: ProposalStatus;
  isLeader: boolean;
  isMember: boolean;
  isFull: boolean;
  status: FoodPartyStatus;
  onClick: (buttonText: FoodPartyDetailStatusButtonText) => void;
};

const FoodPartyDetailStatusButton = ({
  applied,
  isLeader,
  isMember,
  isFull,
  status,
  onClick,
}: FoodPartyDetailStatusButtonProps) => {
  const buttonText = getFoodPartyDetailStatusButtonText(
    applied,
    isLeader,
    isMember,
    isFull,
    status
  );
  const isDisabled = checkButtonTextIsDisabled(buttonText);

  return (
    <>
      {buttonText !== '' && (
        <Button
          onClick={() => {
            onClick(buttonText);
          }}
          disabled={isDisabled}
          position='absolute'
          left='50%'
          transform='translateX(-50%)'
          bottom='1rem'
          height='3rem'
          width='20rem'
          cursor={isDisabled ? 'not-allowed' : 'pointer'}
          opacity={isDisabled ? 0.5 : 1}
          backgroundColor='primary'
          color='white'
          _hover={{ backgroundColor: 'primary' }}>
          {buttonText}
        </Button>
      )}
    </>
  );
};

export default FoodPartyDetailStatusButton;
