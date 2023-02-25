import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { BiMinus } from 'react-icons/bi';

type ZoomOutButtonProps = {
  onClick: () => void;
};

const ZoomOutButton = ({ onClick }: ZoomOutButtonProps) => {
  return (
    <StyledButton
      backgroundColor='white'
      zIndex={10}
      onClick={onClick}
      padding='0 0.5rem'>
      <BiMinus fontSize='1.5rem' />
    </StyledButton>
  );
};

export default ZoomOutButton;

const StyledButton = styled(Button)`
  box-shadow: ${({ theme }) => theme.boxShadow.button};
`;
