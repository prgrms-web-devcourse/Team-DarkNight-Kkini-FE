import useClickAway from 'hooks/useClickAway';
import {
  createContext,
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { RandomRestaurantType } from 'types/kakaoMap';

type RandomRestaurantContextType = {
  randomRestaurant: RandomRestaurantType;
  randomRestaurantModalOpen: boolean;
  setRandomRestaurant: Dispatch<SetStateAction<RandomRestaurantType>>;
  handleOpenRandomRestaurantModal: () => void;
  handleCloseRandomRestaurantModal: () => void;
  randomRestaurantModalRef: RefObject<HTMLDivElement> | null;
};

const RandomRestaurantContext = createContext<RandomRestaurantContextType>({
  randomRestaurant: {},
  randomRestaurantModalOpen: false,
  setRandomRestaurant: () => {},
  handleOpenRandomRestaurantModal: () => {},
  handleCloseRandomRestaurantModal: () => {},
  randomRestaurantModalRef: null,
});

const useRandomRestaurantContext = () => useContext(RandomRestaurantContext);

export const RandomRestaurantProvider = ({ children }: { children: ReactNode }) => {
  const [randomRestaurant, setRandomRestaurant] = useState<RandomRestaurantType>({});
  const [randomRestaurantModalOpen, setRandomRestaurantModalOpen] = useState(false);
  const handleOpenRandomRestaurantModal = () => {
    setRandomRestaurantModalOpen(true);
  };
  const handleCloseRandomRestaurantModal = () => {
    setRandomRestaurantModalOpen(false);
  };
  const randomRestaurantModalRef = useClickAway(handleCloseRandomRestaurantModal);

  return (
    <RandomRestaurantContext.Provider
      value={{
        randomRestaurant,
        randomRestaurantModalOpen,
        setRandomRestaurant,
        handleOpenRandomRestaurantModal,
        handleCloseRandomRestaurantModal,
        randomRestaurantModalRef,
      }}>
      {children}
    </RandomRestaurantContext.Provider>
  );
};

export default useRandomRestaurantContext;
