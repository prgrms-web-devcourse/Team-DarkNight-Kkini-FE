import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Layout from 'components/common/Layout';
import { KakaoMapProvider } from 'contexts/kakaoMap';
import { RandomRestaurantProvider } from 'contexts/kakaoMap/randomRestaurant';
import useRouteChangeTracker from 'hooks/useRouteChangeTracker';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { RecoilRoot } from 'recoil';

const App = ({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>) => {
  useRouteChangeTracker();
  const [queryClient] = useState(() => new QueryClient());

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <KakaoMapProvider>
            <RandomRestaurantProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </RandomRestaurantProvider>
          </KakaoMapProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default App;
