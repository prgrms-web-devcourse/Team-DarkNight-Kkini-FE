import { Badge } from '@chakra-ui/react';
import { ReactNode } from 'react';

type CategoryProps = {
  children: ReactNode;
  backgroundColor?: string;
};

const CHAKRA_BUTTON_DEFAULT_COLOR = 'gray.100';

const Category = ({ children, backgroundColor }: CategoryProps) => {
  return (
    <Badge
      backgroundColor={backgroundColor || CHAKRA_BUTTON_DEFAULT_COLOR}
      borderRadius='1.5rem'
      padding='2px 5px'>
      {children}
    </Badge>
  );
};

export default Category;
