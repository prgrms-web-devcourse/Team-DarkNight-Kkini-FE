import { useEffect } from 'react';
import debounce from 'utils/helpers/debounce';

const useAdjustHeightForMobileView = () => {
  useEffect(() => {
    // 처음에 한 번 높이를 맞춰줌.
    adjustHeight();

    // 브라우저 화면의 크기가 변할 경우 adjustHeight 실행.
    window.addEventListener('resize', adjustHeightFunctionDebounced);
    return () => {
      window.removeEventListener('resize', adjustHeightFunctionDebounced);
    };
  }, []);
};

export default useAdjustHeightForMobileView;

const adjustHeight = () => {
  // 모바일이면 뷰포트에서 주소창을 제외한 높이, 웹이면 그냥 뷰포트 높이
  const heightExcludingAddressBar = window.innerHeight;
  document.documentElement.style.setProperty(
    '--height-excluding-address-bar',
    `${heightExcludingAddressBar}px`
  );
};

const DEFAULT_DEBOUNCE_DELAY_TIME = 150;

const adjustHeightFunctionDebounced = debounce(adjustHeight, DEFAULT_DEBOUNCE_DELAY_TIME);
