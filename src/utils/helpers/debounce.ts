const debounce = (callback: () => void, delayTime: number) => {
  let timerId: number;

  return () => {
    if (!window) return;
    if (timerId) window.clearTimeout(timerId);

    timerId = window.setTimeout(callback, delayTime);
  };
};

export default debounce;
