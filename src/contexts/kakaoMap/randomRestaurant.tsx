import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type RandomRestaurantType = {
  placeName?: string;
  categories?: string[];
  roadAddressName?: string;
  photoUrls?: string[];
  isOpen?: boolean;
  kakaoPlaceUrl?: string;
  phoneNumber?: string;
  marker?: kakao.maps.Marker | null;
};

type RandomRestaurantContextType = {
  randomRestaurant: RandomRestaurantType;
  setRandomRestaurant: Dispatch<SetStateAction<RandomRestaurantType>>;
};

const RandomRestaurantContext = createContext<RandomRestaurantContextType>({
  randomRestaurant: {},
  setRandomRestaurant: () => {},
});

const useRandomRestaurantContext = () => useContext(RandomRestaurantContext);

export const RandomRestaurantProvider = ({ children }: { children: ReactNode }) => {
  const [randomRestaurant, setRandomRestaurant] = useState<RandomRestaurantType>({});
  console.log(randomRestaurant);

  return (
    <RandomRestaurantContext.Provider
      value={{
        randomRestaurant,
        setRandomRestaurant,
      }}>
      {children}
    </RandomRestaurantContext.Provider>
  );
};

export default useRandomRestaurantContext;
