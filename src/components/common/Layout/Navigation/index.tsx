import { Box, Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { BsMap } from 'react-icons/bs';
import { CgCommunity } from 'react-icons/cg';

const Navigation = () => {
  return (
    <Flex as='nav' h='3.5rem' justify='space-around' align='center' px='10'>
      <ButtonContainer
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='space-between'
        h='100%'
        color='#949494'>
        <MapIcon />
        <Label>밥모임 생성</Label>
      </ButtonContainer>
      <ButtonContainer
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='space-between'
        h='100%'
        color='#949494'>
        <PlusIcon />
        <Label>밥모임 생성</Label>
      </ButtonContainer>
      <ButtonContainer
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='space-between'
        h='100%'
        color='#949494'>
        <CommunityIcon />
        <Label>밥모임 생성</Label>
      </ButtonContainer>
    </Flex>
  );
};

export default Navigation;

const ButtonContainer = styled(Box)`
  cursor: pointer;
  &:hover {
    color: #ff5c00;
  }
`;

const Label = styled.span`
  font-size: 0.8rem;
`;

const PlusIcon = styled(AiOutlinePlusCircle)`
  width: 1.8rem;
  height: 1.8rem;
`;

const MapIcon = styled(BsMap)`
  width: 1.4rem;
  height: 1.4rem;
`;

const CommunityIcon = styled(CgCommunity)`
  width: 2rem;
  height: 2rem;
`;
