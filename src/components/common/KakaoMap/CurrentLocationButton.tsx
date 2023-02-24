import { Button } from '@chakra-ui/react';
import { TfiTarget } from 'react-icons/tfi';

type Props = {
  onClick: () => void;
};

const CurrentLocationButton = ({ onClick }: Props) => {
  return (
    <Button
      onClick={onClick}
      colorScheme={'red'}
      position={'absolute'}
      bottom={'1rem'}
      right={'1rem'}
      zIndex={10}>
      <TfiTarget color='white' />
    </Button>
  );
};

export default CurrentLocationButton;
