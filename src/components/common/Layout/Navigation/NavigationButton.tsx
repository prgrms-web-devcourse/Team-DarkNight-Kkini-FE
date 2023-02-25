import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

const NavigationButton = ({ children }: { children: ReactNode }) => {
  return (
    <ButtonContainer
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='space-between'
      h='100%'
      color='#949494'>
      {children}
    </ButtonContainer>
  );
};

export default NavigationButton;

const ButtonContainer = styled(Box)`
  cursor: pointer;
  &:hover {
    color: #ff5c00;
  }
`;
