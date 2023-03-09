import { Button } from '@chakra-ui/react';

type RecommendRandomRestaurantButtonProps = {
  isLoading: boolean;
  onClick: () => void;
};

const RecommendRandomRestaurantButton = ({
  isLoading,
  onClick,
}: RecommendRandomRestaurantButtonProps) => {
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
      backgroundColor='primary'
      boxShadow='button'
      _hover={{ backgroundColor: 'primary' }}
      _disabled={{ backgroundColor: 'primary' }}>
      랜덤 맛집 뽑기
    </Button>
  );
};

export default RecommendRandomRestaurantButton;
