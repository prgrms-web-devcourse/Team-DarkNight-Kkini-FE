import { useRouter } from 'next/router';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { Restaurant } from 'types/restaurant';

type RandomRestaurantContextType = {
  randomRestaurant: Restaurant;
  setRandomRestaurant: Dispatch<SetStateAction<Restaurant>>;
  handleClickJoinToFoodPartyButton: () => void;
};

const RandomRestaurantContext = createContext<RandomRestaurantContextType>({
  randomRestaurant: {
    placeId: -1,
    placeName: '',
    categories: [''],
    roadAddressName: '',
    kakaoPlaceUrl: '',
    phoneNumber: '',
    distance: -1,
    latitude: -1,
    longitude: -1,
  },
  setRandomRestaurant: () => {},
  handleClickJoinToFoodPartyButton: () => {},
});

const useRandomRestaurantContext = () => useContext(RandomRestaurantContext);

export const RandomRestaurantProvider = ({ children }: { children: ReactNode }) => {
  const [randomRestaurant, setRandomRestaurant] = useState<Restaurant>({
    placeId: -1,
    placeName: '',
    categories: [''],
    roadAddressName: '',
    kakaoPlaceUrl: '',
    phoneNumber: '',
    distance: -1,
    latitude: -1,
    longitude: -1,
  });
  const router = useRouter();

  const handleClickJoinToFoodPartyButton = () => {
    if (!randomRestaurant.placeId) return;

    router.push(`/food-party/place/${randomRestaurant.placeId}`);
  };

  return (
    <RandomRestaurantContext.Provider
      value={{
        randomRestaurant,
        setRandomRestaurant,
        handleClickJoinToFoodPartyButton,
      }}>
      {children}
    </RandomRestaurantContext.Provider>
  );
};

export default useRandomRestaurantContext;
