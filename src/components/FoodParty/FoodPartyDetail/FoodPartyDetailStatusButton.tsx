import { Button, Flex } from '@chakra-ui/react';
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
        <Flex flex={1} height='100%' flexDirection='column-reverse' alignItems='center'>
          <Button
            onClick={onClick}
            disabled={isDisabled}
            height='3rem'
            width='20rem'
            cursor={isDisabled ? 'not-allowed' : 'pointer'}
            opacity={isDisabled ? 0.5 : 1}
            backgroundColor='primary'
            color='white'
            _hover={{ backgroundColor: 'primary' }}>
            {buttonText}
          </Button>
        </Flex>
      )}
    </>
  );
};

export default FoodPartyDetailStatusButton;
