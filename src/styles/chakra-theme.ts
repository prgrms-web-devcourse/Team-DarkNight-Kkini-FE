import { extendTheme } from '@chakra-ui/react';

const customTheme = {
  colors: {
    primary: '#FF5C00',
    subBackground: '#F9F9F9',
  },
  shadows: {
    button: '2px 2px 2px 1px rgba(0,0,0,0.25)',
  },
  sizes: {
    kkiniMobile: '560px',
  },
};

const theme = extendTheme(customTheme);

export default theme;
