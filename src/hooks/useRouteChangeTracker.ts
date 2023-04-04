import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { measurePageViewByGTag } from 'utils/helpers/gtag';

const useRouteChangeTracker = () => {
  const router = useRouter();

  useEffect(() => {
    const handleChangeRoute = (url: URL) => {
      measurePageViewByGTag(url);
    };

    router.events.on('routeChangeComplete', handleChangeRoute);
    return () => {
      router.events.off('routeChangeComplete', handleChangeRoute);
    };
  }, [router.events]);
};

export default useRouteChangeTracker;
