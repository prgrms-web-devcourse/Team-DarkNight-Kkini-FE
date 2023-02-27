import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type RandomRestaurantMarkerType = {
  randomRestaurantMarker: kakao.maps.Marker | null;
  setRandomRestaurantMarker: Dispatch<SetStateAction<kakao.maps.Marker | null>>;
};

const RandomRestaurantMarkerContext = createContext<RandomRestaurantMarkerType>({
  randomRestaurantMarker: null,
  setRandomRestaurantMarker: () => {},
});

const useRandomRestaurantMarkerContext = () => useContext(RandomRestaurantMarkerContext);

export const RandomRestaurantMarkerProvider = ({ children }: { children: ReactNode }) => {
  const [randomRestaurantMarker, setRandomRestaurantMarker] =
    useState<kakao.maps.Marker | null>(null);

  const value = {
    randomRestaurantMarker,
    setRandomRestaurantMarker,
  };

  return (
    <RandomRestaurantMarkerContext.Provider value={value}>
      {children}
    </RandomRestaurantMarkerContext.Provider>
  );
};

export default useRandomRestaurantMarkerContext;
