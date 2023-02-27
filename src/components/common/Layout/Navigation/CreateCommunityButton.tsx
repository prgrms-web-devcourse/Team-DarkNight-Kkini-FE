import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

type CreateCommunityButtonProps = {
  children: ReactNode;
  onClick: () => void;
};

const CreateCommunityButton = ({ children, onClick }: CreateCommunityButtonProps) => {
  return (
    <ButtonContainer
      onClick={onClick}
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='space-between'
      h='90%'
      color='#949494'>
      {children}
    </ButtonContainer>
  );
};

export default CreateCommunityButton;

const ButtonContainer = styled(Box)`
  cursor: pointer;
  &:hover {
    color: #ff5c00;
  }
`;
