import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { BiTargetLock } from 'react-icons/bi';

type CurrentLocationButtonProps = {
  isLoading: boolean;
  onClick: () => void;
};

const CurrentLocationButton = ({ isLoading, onClick }: CurrentLocationButtonProps) => {
  return (
    <StyledButton
      isLoading={isLoading}
      backgroundColor='white'
      zIndex={10}
      onClick={onClick}
      padding='0 0.5rem'>
      <BiTargetLock fontSize='1.5rem' />
    </StyledButton>
  );
};

export default CurrentLocationButton;

const StyledButton = styled(Button)`
  box-shadow: ${({ theme }) => theme.boxShadow.button};
`;
