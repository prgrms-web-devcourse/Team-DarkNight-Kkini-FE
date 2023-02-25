import { Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { BsMap } from 'react-icons/bs';
import { CgCommunity } from 'react-icons/cg';

import NavigationButton from './NavigationButton';

const Navigation = () => {
  return (
    <Flex as='nav' h='4rem' justify='space-around' align='center' px='10' py='1'>
      <NavigationButton>
        <MapIcon />
        <Label>주변 밥모임</Label>
      </NavigationButton>
      <NavigationButton>
        <PlusIcon />
        <Label>밥모임 생성</Label>
      </NavigationButton>
      <NavigationButton>
        <CommunityIcon />
        <Label>내 밥모임</Label>
      </NavigationButton>
    </Flex>
  );
};

export default Navigation;

const PlusIcon = styled(AiOutlinePlusCircle)`
  width: 1.6rem;
  height: 1.6rem;
  margin-top: 0.1rem;
`;

const MapIcon = styled(BsMap)`
  width: 1.6rem;
  height: 1.6rem;
  padding-top: 0.2rem;
  padding-bottom: 0.1rem;
`;

const CommunityIcon = styled(CgCommunity)`
  width: 2.5rem;
  height: 2.5rem;
  margin-bottom: 0.1rem;
`;

const Label = styled.span`
  font-size: 0.8rem;
`;
