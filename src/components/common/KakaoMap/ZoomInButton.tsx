import { Button } from '@chakra-ui/react';
import { BiPlus } from 'react-icons/bi';

type ZoomInButtonProps = {
  onClick: () => void;
};

const ZoomInButton = ({ onClick }: ZoomInButtonProps) => {
  return (
    <Button
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
