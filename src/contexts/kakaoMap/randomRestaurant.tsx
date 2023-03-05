import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { RandomRestaurantType } from 'types/kakaoMap';

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
