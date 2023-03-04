import { Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { BsMap } from 'react-icons/bs';
import { CgCommunity } from 'react-icons/cg';
import { useSetRecoilState } from 'recoil';
import { isDrawerOpenedState } from 'stores/drawer';

import CreateCommunityButton from './CreateCommunityButton';
import NavigationLinkButton from './NavigationLinkButton';

const Navigation = () => {
  const setIsDrawerOpened = useSetRecoilState(isDrawerOpenedState);
  const handleClickCommunity = () => {
    setIsDrawerOpened(true);
  };
  return (
    <Flex
      as='nav'
      h='4rem'
      justify='space-around'
      align='center'
      px='10'
      py='1'
      backgroundColor='#ffffff'
      zIndex={100}>
      <NavigationLinkButton href='/'>
        <MapIcon />
        <Label>주변 밥모임</Label>
      </NavigationLinkButton>
      <CreateCommunityButton onClick={handleClickCommunity}>
        <PlusIcon />
        <Label>밥모임 생성</Label>
      </CreateCommunityButton>
      <NavigationLinkButton href='/*'>
        <CommunityIcon />
        <Label>내 밥모임</Label>
      </NavigationLinkButton>
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
