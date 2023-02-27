import { Button } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import { BiTargetLock } from 'react-icons/bi';

type CurrentLocationButtonProps = {
  isLoading: boolean;
  onClick: () => void;
};

const CurrentLocationButton = ({ isLoading, onClick }: CurrentLocationButtonProps) => {
  const theme = useTheme();

  return (
    <Button
      isLoading={isLoading}
      backgroundColor='white'
      zIndex={10}
      onClick={onClick}
      padding='0 0.5rem'
      css={{
        boxShadow: theme.boxShadow.button,
      }}>
      <BiTargetLock fontSize='1.5rem' />
    </Button>
  );
};

export default CurrentLocationButton;
