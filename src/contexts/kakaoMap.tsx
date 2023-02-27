import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type KakaoMapContextType = {
  kakaoMap: kakao.maps.Map | null;
  setKakaoMap: Dispatch<SetStateAction<kakao.maps.Map | null>>;
};

const KakaoMapContext = createContext<KakaoMapContextType>({
  kakaoMap: null,
  setKakaoMap: () => {},
});

const useKakaoMapContext = () => useContext(KakaoMapContext);

export const KakaoMapProvider = ({ children }: { children: ReactNode }) => {
  const [kakaoMap, setKakaoMap] = useState<kakao.maps.Map | null>(null);

  const value = {
    kakaoMap,
    setKakaoMap,
  };

  return <KakaoMapContext.Provider value={value}>{children}</KakaoMapContext.Provider>;
};

export default useKakaoMapContext;
