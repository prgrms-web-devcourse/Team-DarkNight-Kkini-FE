import { Badge, BadgeProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

type CategoryProps = {
  children: ReactNode;
  style?: BadgeProps;
};

const Category = ({ children, style }: CategoryProps) => {
  return <Badge {...style}>{children}</Badge>;
};

export default Category;
