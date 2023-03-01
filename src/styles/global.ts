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
`;

export default globalStyle;
