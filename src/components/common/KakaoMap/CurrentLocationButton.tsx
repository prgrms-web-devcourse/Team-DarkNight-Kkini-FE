import { Button } from '@chakra-ui/react';
import { TfiTarget } from 'react-icons/tfi';

type Props = {
  isLoading: boolean;
  onClick: () => void;
};

const CurrentLocationButton = ({ isLoading, onClick }: Props) => {
  return (
    <Button isLoading={isLoading} onClick={onClick} colorScheme={'red'} zIndex={10}>
      <TfiTarget color='white' />
    </Button>
  );
};

export default CurrentLocationButton;
