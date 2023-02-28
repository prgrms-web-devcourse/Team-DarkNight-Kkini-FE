import { Badge } from '@chakra-ui/react';
import { ReactNode } from 'react';

const Category = ({ children }: { children: ReactNode }) => {
  return (
    <Badge borderRadius='1.5rem' padding='2px 5px'>
      {children}
    </Badge>
  );
};

export default Category;
