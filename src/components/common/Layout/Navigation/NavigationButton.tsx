import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { NavigationButtonProps } from 'types/navigation';

const NavigationButton = ({ Icon, label, onClick }: NavigationButtonProps) => {
  return (
    <Box
      onClick={onClick}
      cursor='pointer'
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='space-between'
      h='90%'
      color='#949494'
      _hover={{ color: 'primary' }}>
      {Icon}
      <Label>{label}</Label>
    </Box>
  );
};

export default NavigationButton;

const Label = styled.span`
  font-size: 0.8rem;
`;
