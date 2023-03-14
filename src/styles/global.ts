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

  // 스크롤바 없애기
  body {
    -ms-overflow-style: none;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  // 랜덤 맛집 커스텀 오버레이
  .random-restaurant-custom-overlay {
    animation: put-down 0.35s linear;
  }

  @keyframes put-down {
    0% {
      transform: translate(1000%, -1000%);
    }

    65% {
      transform: translate(0%, 0%);
    }

    65% {
      transform: translate(0, 0) rotate(0deg);
    }
    67% {
      transform: translate(5px, 5px) rotate(5deg);
    }
    70% {
      transform: translate(0, 0) rotate(0deg);
    }
    75% {
      transform: translate(-5px, 5px) rotate(-5deg);
    }
    80% {
      transform: translate(0, 0) rotate(0deg);
    }

    85% {
      transform: translate(0, 0) rotate(0deg);
    }
    87% {
      transform: translate(5px, 5px) rotate(5deg);
    }
    90% {
      transform: translate(0, 0) rotate(0deg);
    }
    95% {
      transform: translate(-5px, 5px) rotate(-5deg);
    }
    100% {
      transform: translate(0, 0) rotate(0deg);
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
