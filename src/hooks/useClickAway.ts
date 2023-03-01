import { useEffect, useRef } from 'react';

const DEFAULT_EVENT_TYPES = ['mousedown', 'touchstart'];

const useClickAway = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // 타입 설정을 어떻게 해줘야 할지 모르겠네요. by 승준
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleEvent = (event: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      !element.contains(event.target) && savedCallback.current();
    };

    DEFAULT_EVENT_TYPES.forEach((eventType) => {
      document.addEventListener(eventType, handleEvent);
    });

    return () => {
      DEFAULT_EVENT_TYPES.forEach((eventType) => {
        document.removeEventListener(eventType, handleEvent);
      });
    };
  }, [callback, ref]);

  return ref;
};

export default useClickAway;
