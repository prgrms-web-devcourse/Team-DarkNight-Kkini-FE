import { Button } from '@chakra-ui/react';
import { BiPlus } from 'react-icons/bi';

type Props = {
  onClick: () => void;
};

const ZoomInButton = ({ onClick }: Props) => {
  return (
    <Button
      backgroundColor='white'
      zIndex={10}
      onClick={onClick}
      padding='0 0.5rem'
      boxShadow={'2px 2px 2px 1px rgba(0,0,0,0.25)'}>
      <BiPlus fontSize='1.5rem' />
    </Button>
  );
};

export default ZoomInButton;
