import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';

type RecommendRandomRestaurantButtonProps = {
  isLoading: boolean;
  onClick: () => void;
};

const RecommendRandomRestaurantButton = ({
  isLoading,
  onClick,
}: RecommendRandomRestaurantButtonProps) => {
  return (
    <StyledButton
      position='absolute'
      bottom='1.5rem'
      left='50%'
      zIndex={10}
      padding='1.5rem 5rem'
      color='white'
      transform='translateX(-50%)'
      isLoading={isLoading}
      onClick={onClick}>
      랜덤 맛집 뽑기
    </StyledButton>
  );
};

export default RecommendRandomRestaurantButton;

const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.color.primary};
  box-shadow: ${({ theme }) => theme.boxShadow.button};

  &:hover,
  &:disabled {
    background-color: ${({ theme }) => theme.color.primary};

    &:hover {
      background-color: ${({ theme }) => theme.color.primary};
    }
  }
`;
