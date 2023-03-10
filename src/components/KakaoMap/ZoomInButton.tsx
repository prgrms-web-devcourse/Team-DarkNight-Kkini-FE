import { Button } from '@chakra-ui/react';
import { BiPlus } from 'react-icons/bi';
import { bottomToTopAnimationKeyframes } from 'styles/animations';

type ZoomInButtonProps = {
  onClick: () => void;
};

const ZoomInButton = ({ onClick }: ZoomInButtonProps) => {
  return (
    <Button
      animation={`${bottomToTopAnimationKeyframes} 0.5s`}
      backgroundColor='white'
      zIndex={10}
      onClick={onClick}
      padding='0 0.5rem'
      boxShadow='button'>
      <BiPlus fontSize='1.5rem' />
    </Button>
  );
};

export default ZoomInButton;
