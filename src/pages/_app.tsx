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
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';
import { pageview } from 'utils/helpers/gtag';

const App = ({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>) => {
  const [queryClient] = useState(() => new QueryClient());

  // Google Analytics
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

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
