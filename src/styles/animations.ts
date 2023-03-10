import { keyframes } from '@emotion/react';

const bottomToTopAnimationKeyframes = keyframes`
  from {
    opacity: 0;
    transform: translateY(30%);
  }

  to {
    opacity: 1;
    transform: translateY(0%);
  }
`;

export const bottomToTopAnimation = `${bottomToTopAnimationKeyframes} 0.5s`;
