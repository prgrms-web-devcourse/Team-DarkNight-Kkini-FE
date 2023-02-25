import { Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

type Props = {
  width?: string;
  height?: string;
  children?: ReactNode;
};

const Button = ({ width = '100%', height = '3rem', ...props }: Props) => {
  return (
    <ButtonContainer
      as='button'
      align='center'
      justify='center'
      gap='8px'
      w={width}
      h={height}
      color='white'
      borderRadius='8px'
      {...props}>
      {props.children}
    </ButtonContainer>
  );
};

const ButtonContainer = styled(Flex)`
  background-color: ${({ theme }) => theme.color.primary};
  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }
`;

export default Button;
