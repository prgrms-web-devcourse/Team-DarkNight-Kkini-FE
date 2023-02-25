import { Button } from '@chakra-ui/react';
import { BiTargetLock } from 'react-icons/bi';

type Props = {
  isLoading: boolean;
  onClick: () => void;
};

const CurrentLocationButton = ({ isLoading, onClick }: Props) => {
  return (
    <Button
      isLoading={isLoading}
      backgroundColor='white'
      zIndex={10}
      onClick={onClick}
      padding='0 0.5rem'
      boxShadow={'2px 2px 2px 1px rgba(0,0,0,0.25)'}>
      <BiTargetLock fontSize='1.5rem' />
    </Button>
  );
};

export default CurrentLocationButton;
