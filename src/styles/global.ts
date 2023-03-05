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

  // 랜덤 맛집 커스텀 오버레이
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

  // 현재 위치 커스텀 오버레이
  .container {
    z-index: 11;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .center {
    width: 1.5rem;
    height: 1.5rem;
    background-color: #ff5c00;
    border-radius: 50%;

    animation: pulse-dot 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite;
  }

  .circle {
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    background-color: #ff5c00;
    opacity: 1;
    position: absolute;

    animation: pulse-ring 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
  }

  @keyframes pulse-dot {
    0% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(1);
    }
    100% {
      transform: scale(0.8);
    }
  }

  @keyframes pulse-ring {
    0% {
      transform: scale(0.33);
    }
    80%,
    100% {
      opacity: 0;
    }
  }
`;

export default globalStyle;
