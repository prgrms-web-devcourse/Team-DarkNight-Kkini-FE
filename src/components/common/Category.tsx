import { Badge } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { FoodPartyStatus } from 'types/foodParty';

type CategoryProps = {
  children: ReactNode;
  foodPartyDetailStatus?: FoodPartyStatus;
};

const Category = ({ children, foodPartyDetailStatus }: CategoryProps) => {
  let backgroundColor;

  switch (foodPartyDetailStatus) {
    case '모집 중':
      backgroundColor = 'lightgreen';
      break;
    case '모집 종료':
      backgroundColor = 'lightyellow';
      break;
    case '식사 완료':
      backgroundColor = 'lightgray';
      break;
    default:
      backgroundColor = 'gray.100';
      break;
  }

  return (
    <Badge backgroundColor={backgroundColor} borderRadius='1.5rem' padding='2px 5px'>
      {children}
    </Badge>
  );
};

export default Category;
