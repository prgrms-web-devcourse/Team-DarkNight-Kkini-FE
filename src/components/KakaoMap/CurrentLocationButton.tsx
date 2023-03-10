import { Button, keyframes } from '@chakra-ui/react';
import { BiTargetLock } from 'react-icons/bi';

type CurrentLocationButtonProps = {
  isLoading: boolean;
  onClick: () => void;
};

const animationKeyframes = keyframes`
  from {
    opacity: 0;
    transform: translateY(10%);
  }

  to {
    opacity: 1;
    transform: translateY(0%);
  }
`;

const animation = `${animationKeyframes} 0.5s`;

const CurrentLocationButton = ({ isLoading, onClick }: CurrentLocationButtonProps) => {
  return (
    <Button
      animation={animation}
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
