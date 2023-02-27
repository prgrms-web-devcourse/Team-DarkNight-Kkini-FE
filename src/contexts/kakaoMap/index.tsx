import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from 'react';

type KakaoMapContextType = {
  kakaoMap: kakao.maps.Map | null;
  setKakaoMap: Dispatch<SetStateAction<kakao.maps.Map | null>>;
  kakaoMapAddEventListener: (
    target: kakao.maps.event.EventTarget,
    type: string,
    callback: () => void
  ) => void;
};

const KakaoMapContext = createContext<KakaoMapContextType>({
  kakaoMap: null,
  setKakaoMap: () => {},
  kakaoMapAddEventListener: () => {},
});

const useKakaoMapContext = () => useContext(KakaoMapContext);

export const KakaoMapProvider = ({ children }: { children: ReactNode }) => {
  const [kakaoMap, setKakaoMap] = useState<kakao.maps.Map | null>(null);

  // kakaoMap이 setState에 의해 변경되어도 새로 생성되지 않도록 useCallback 사용
  // 새로 생성되면 KakaoMap.tsx의 useEffect에서 재귀 발생
  // kakaoMap setState -> KakaoMapProvider 호출 -> kakaoMapAddEventListener 재생성 -> KakaoMap.tsx의 useEffect 로직 재수행 -> kakaoMap setState -> ... 무한 루프
  const kakaoMapAddEventListener = useCallback(
    (target: kakao.maps.event.EventTarget, type: string, callback: () => void) => {
      kakao.maps.event.addListener(target, type, callback);
    },
    []
  );

  const value = {
    kakaoMap,
    setKakaoMap,
    kakaoMapAddEventListener,
  };

  return <KakaoMapContext.Provider value={value}>{children}</KakaoMapContext.Provider>;
};

export default useKakaoMapContext;
