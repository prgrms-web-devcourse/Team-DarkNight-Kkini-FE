import { Button } from '@chakra-ui/react';
import { BiTargetLock } from 'react-icons/bi';
import { bottomToTopAnimation } from 'styles/animations';

type CurrentLocationButtonProps = {
  isLoading: boolean;
  onClick: () => void;
};

const CurrentLocationButton = ({ isLoading, onClick }: CurrentLocationButtonProps) => {
  return (
    <Button
      animation={bottomToTopAnimation}
      isLoading={isLoading}
      backgroundColor='white'
      zIndex={10}
      onClick={onClick}
      padding='0 0.5rem'
      boxShadow='button'>
      <BiTargetLock fontSize='1.5rem' />
    </Button>
  );
};

export default CurrentLocationButton;
