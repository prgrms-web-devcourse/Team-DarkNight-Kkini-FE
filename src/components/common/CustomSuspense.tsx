import { ComponentProps, Suspense, useEffect, useState } from 'react';

const CustomSuspense = (props: ComponentProps<typeof Suspense>) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  if (isMounted) return <Suspense {...props} />;
  return <>{props.fallback}</>;
};

export default CustomSuspense;
