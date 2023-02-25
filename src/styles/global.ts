import { css } from '@emotion/react';

const globalStyle = css`
  * {
    box-sizing: border-box;
  }

  #__next {
    display: flex;
    justify-content: center;
  }

  #main {
    max-width: 560px;
    width: 100%;
    height: 100vh;
    background-color: #f4f4f4;
  }
`;

export default globalStyle;
