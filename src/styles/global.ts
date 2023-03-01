import { css } from '@emotion/react';

const globalStyle = css`
  * {
    box-sizing: border-box;
  }

  #__next {
    display: flex;
    justify-content: center;
  }

  #app {
    max-width: 560px;
    width: 100%;
    height: 100vh;
  }

  .random-restaurant-custom-overlay {
    animation: bounce 2s infinite ease-out;
  }

  @keyframes bounce {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-15px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

export default globalStyle;
