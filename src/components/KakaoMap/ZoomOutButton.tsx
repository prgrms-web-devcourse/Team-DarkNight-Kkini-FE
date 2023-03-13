import { Button } from '@chakra-ui/react';
import { BiMinus } from 'react-icons/bi';
import { bottomToTopAnimation } from 'styles/animations';

type ZoomOutButtonProps = {
  onClick: () => void;
};

const ZoomOutButton = ({ onClick }: ZoomOutButtonProps) => {
  return (
    <Button
      aria-label='축소 버튼'
      animation={bottomToTopAnimation}
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
