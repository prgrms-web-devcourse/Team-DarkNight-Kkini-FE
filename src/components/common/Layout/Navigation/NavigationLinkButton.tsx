import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import React, { ReactNode } from 'react';

type NavigationLinkButtonProps = {
  children: ReactNode;
  href: string;
};

const NavigationLinkButton = ({ children, href }: NavigationLinkButtonProps) => {
  return (
    <Link href={href}>
      <ButtonContainer
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='space-between'
        h='90%'
        color='#949494'>
        {children}
      </ButtonContainer>
    </Link>
  );
};

export default NavigationLinkButton;

const ButtonContainer = styled(Box)`
  cursor: pointer;
  &:hover {
    color: #ff5c00;
  }
`;
