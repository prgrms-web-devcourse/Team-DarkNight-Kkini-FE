import { keyframes } from '@emotion/react';

export const bottomToTopAnimationKeyframes = keyframes`
  from {
    opacity: 0;
    transform: translateY(15%);
  }

  to {
    opacity: 1;
    transform: translateY(0%);
  }
`;
