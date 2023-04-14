const debounce = (callback: () => void, delayTime: number) => {
  let timerId: NodeJS.Timeout | null = null;

  return () => {
    if (timerId) clearTimeout(timerId);

    timerId = setTimeout(callback, delayTime);
  };
};

export default debounce;
