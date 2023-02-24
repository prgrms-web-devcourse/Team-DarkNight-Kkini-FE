import { Button } from '@chakra-ui/react';
import { TfiMinus } from 'react-icons/tfi';

type Props = {
  onClick: () => void;
};

const ZoomOutButton = ({ onClick }: Props) => {
  return (
    <Button colorScheme='red' zIndex={10} onClick={onClick}>
      <TfiMinus />
    </Button>
  );
};

export default ZoomOutButton;
