import { Button } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';

type RecommendRandomRestaurantButtonProps = {
  isLoading: boolean;
  onClick: () => void;
};

const RecommendRandomRestaurantButton = ({
  isLoading,
  onClick,
}: RecommendRandomRestaurantButtonProps) => {
  const theme = useTheme();

  return (
    <Button
      position='absolute'
      bottom='1.5rem'
      left='50%'
      zIndex={10}
      padding='1.5rem 5rem'
      color='white'
      transform='translateX(-50%)'
      isLoading={isLoading}
      onClick={onClick}
      css={{
        backgroundColor: theme.color.primary,
        boxShadow: theme.boxShadow.button,

        '&:hover, &:disabled': {
          backgroundColor: theme.color.primary,

          '&:hover': {
            backgroundColor: theme.color.primary,
          },
        },
      }}>
      랜덤 맛집 뽑기
    </Button>
  );
};

export default RecommendRandomRestaurantButton;
