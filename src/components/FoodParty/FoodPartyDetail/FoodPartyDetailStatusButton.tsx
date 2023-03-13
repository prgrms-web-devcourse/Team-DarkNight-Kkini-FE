import { Button } from '@chakra-ui/react';
import { FoodPartyDetailStatusButtonText } from 'types/foodParty';

type FoodPartyDetailStatusButtonProps = {
  buttonText: FoodPartyDetailStatusButtonText;
  isDisabled: boolean;
  onClick: () => void;
};

const FoodPartyDetailStatusButton = ({
  buttonText,
  isDisabled,
  onClick,
}: FoodPartyDetailStatusButtonProps) => {
  return (
    <>
      {buttonText && (
        <Button
          onClick={onClick}
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
