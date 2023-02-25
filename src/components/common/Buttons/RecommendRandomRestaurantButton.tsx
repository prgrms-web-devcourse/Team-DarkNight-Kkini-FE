import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';

const RecommendRandomRestaurantButton = () => {
  return <StyledButton>랜덤 맛집 뽑기</StyledButton>;
};

export default RecommendRandomRestaurantButton;

const StyledButton = styled(Button)`
  padding: 1.5rem 4rem;
  color: white;
  background-color: ${({ theme }) => theme.color.primary};
  box-shadow: ${({ theme }) => theme.boxShadow.button};

  &:hover {
    background-color: black;
  }
`;
