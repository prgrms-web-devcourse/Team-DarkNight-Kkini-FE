import { Button } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import { BiPlus } from 'react-icons/bi';

type ZoomInButtonProps = {
  onClick: () => void;
};

const ZoomInButton = ({ onClick }: ZoomInButtonProps) => {
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
      <BiPlus fontSize='1.5rem' />
    </Button>
  );
};

export default ZoomInButton;
