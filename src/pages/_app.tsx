import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Layout from 'components/common/Layout';
import { KakaoMapProvider } from 'contexts/kakaoMap';
import { RandomRestaurantProvider } from 'contexts/kakaoMap/randomRestaurant';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <KakaoMapProvider>
          <RandomRestaurantProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </RandomRestaurantProvider>
        </KakaoMapProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default App;
