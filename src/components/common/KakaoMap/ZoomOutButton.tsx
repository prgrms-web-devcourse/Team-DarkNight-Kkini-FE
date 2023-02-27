import { Button } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import { BiMinus } from 'react-icons/bi';

type ZoomOutButtonProps = {
  onClick: () => void;
};

const ZoomOutButton = ({ onClick }: ZoomOutButtonProps) => {
  const theme = useTheme();

  return (
    <Button
      backgroundColor='white'
      zIndex={10}
      onClick={onClick}
      padding='0 0.5rem'
      css={{
        boxShadow: theme.boxShadow.button,
      }}>
      <BiMinus fontSize='1.5rem' />
    </Button>
  );
};

export default ZoomOutButton;
