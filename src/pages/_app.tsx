import { Global, ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Layout from 'components/common/Layout';
import { KakaoMapProvider } from 'contexts/kakaoMap';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import globalStyle from 'styles/global';
import theme from 'styles/theme';

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Global styles={globalStyle} />
          <KakaoMapProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </KakaoMapProvider>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default App;
