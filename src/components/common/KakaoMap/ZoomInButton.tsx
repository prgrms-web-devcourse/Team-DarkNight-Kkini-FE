import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { BiPlus } from 'react-icons/bi';

type ZoomInButtonProps = {
  onClick: () => void;
};

const ZoomInButton = ({ onClick }: ZoomInButtonProps) => {
  return (
    <StyledButton
      backgroundColor='white'
      zIndex={10}
      onClick={onClick}
      padding='0 0.5rem'>
      <BiPlus fontSize='1.5rem' />
    </StyledButton>
  );
};

export default ZoomInButton;

const StyledButton = styled(Button)`
  box-shadow: ${({ theme }) => theme.boxShadow.button};
`;
