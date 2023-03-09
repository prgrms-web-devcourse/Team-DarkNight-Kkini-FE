import { Button } from '@chakra-ui/react';
import { FoodPartyDetailChangeStatusButtonText, FoodPartyStatus } from 'types/foodParty';
import {
  checkButtonTextIsDisabled,
  getFoodPartyDetailChangeStatusButtonText,
} from 'utils/helpers/foodParty';

type FoodPartyDetailChangeStatusButtonProps = {
  isLeader: boolean;
  isMember: boolean;
  isFull: boolean;
  status: FoodPartyStatus;
  onClick: (buttonText: FoodPartyDetailChangeStatusButtonText) => void;
};

const FoodPartyDetailChangeStatusButton = ({
  isLeader,
  isMember,
  isFull,
  status,
  onClick,
}: FoodPartyDetailChangeStatusButtonProps) => {
  const buttonText = getFoodPartyDetailChangeStatusButtonText(
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

export default FoodPartyDetailChangeStatusButton;
