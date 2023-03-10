import { Button, keyframes } from '@chakra-ui/react';
import { BiMinus } from 'react-icons/bi';

type ZoomOutButtonProps = {
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

const ZoomOutButton = ({ onClick }: ZoomOutButtonProps) => {
  return (
    <Button
      animation={animation}
      backgroundColor='white'
      zIndex={10}
      onClick={onClick}
      padding='0 0.5rem'
      boxShadow='button'>
      <BiMinus fontSize='1.5rem' />
    </Button>
  );
};

export default ZoomOutButton;
