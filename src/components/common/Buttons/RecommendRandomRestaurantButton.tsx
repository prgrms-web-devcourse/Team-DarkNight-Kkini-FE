import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';

const RecommendRandomRestaurantButton = () => {
  return <StyledButton>랜덤 맛집 뽑기</StyledButton>;
};

export default RecommendRandomRestaurantButton;

const StyledButton = styled(Button)`
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  z-index: 10;
  padding: 1.5rem 5rem;
  color: white;
  background-color: ${({ theme }) => theme.color.primary};
  box-shadow: ${({ theme }) => theme.boxShadow.button};
  transform: translateX(-50%);

  &:hover {
    background-color: ${({ theme }) => theme.color.primary};
  }
`;
