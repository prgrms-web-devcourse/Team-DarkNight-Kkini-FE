import { Button, keyframes } from '@chakra-ui/react';

type RecommendRandomRestaurantButtonProps = {
  isLoading: boolean;
  onClick: () => void;
};

const bottomToTopAnimationKeyframes = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(30%);
  }

  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0%);
  }
`;

const RecommendRandomRestaurantButton = ({
  isLoading,
  onClick,
}: RecommendRandomRestaurantButtonProps) => {
  return (
    <Button
      animation={`${bottomToTopAnimationKeyframes} 0.5s`}
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
