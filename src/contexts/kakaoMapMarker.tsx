import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type KakaoMapMarkerType = {
  kakaoMapMarker: kakao.maps.Marker | null;
  setKakaoMapMarker: Dispatch<SetStateAction<kakao.maps.Marker | null>>;
};

const KakaoMapMarkerContext = createContext<KakaoMapMarkerType>({
  kakaoMapMarker: null,
  setKakaoMapMarker: () => {},
});

const useKakaoMapMarkerContext = () => useContext(KakaoMapMarkerContext);

export const KakaoMapMarkerProvider = ({ children }: { children: ReactNode }) => {
  const [kakaoMapMarker, setKakaoMapMarker] = useState<kakao.maps.Marker | null>(null);

  const value = {
    kakaoMapMarker,
    setKakaoMapMarker,
  };

  return (
    <KakaoMapMarkerContext.Provider value={value}>
      {children}
    </KakaoMapMarkerContext.Provider>
  );
};

export default useKakaoMapMarkerContext;
