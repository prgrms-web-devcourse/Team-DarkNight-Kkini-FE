import { Flex, FlexProps } from '@chakra-ui/react';
import { SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

type Props = {
  width?: string;
  height?: string;
  disabled?: boolean;
  loading?: boolean;
  style?: FlexProps;
  children?: ReactNode;
  type?: string;
  onClick?: () => void;
};

const Button = ({
  width = '100%',
  height = '3rem',
  onClick = () => {},
  ...props
}: Props) => {
  return (
    <ButtonContainer
      as='button'
      align='center'
      justify='center'
      w={width}
      h={height}
      disabled={props.disabled}
      loading={props.loading}
      borderRadius='8px'
      onClick={onClick}
      type={props.type}
      {...props.style}>
      {props.children}
    </ButtonContainer>
  );
};

const ButtonContainer = styled(Flex)`
  cursor: pointer;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      filter: brightness(0.9);
    }
  }
`;

export default Button;
