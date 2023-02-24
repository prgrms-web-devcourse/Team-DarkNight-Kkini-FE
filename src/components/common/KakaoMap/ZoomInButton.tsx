import { Button } from '@chakra-ui/react';
import { TfiPlus } from 'react-icons/tfi';

type Props = {
  onClick: () => void;
};

const ZoomInButton = ({ onClick }: Props) => {
  return (
    <Button colorScheme='red' zIndex={10} onClick={onClick}>
      <TfiPlus />
    </Button>
  );
};

export default ZoomInButton;
