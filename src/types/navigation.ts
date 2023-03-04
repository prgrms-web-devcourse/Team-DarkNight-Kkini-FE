import { ReactNode } from 'react';

export type NavigationButtonProps = {
  Icon: ReactNode;
  label: string;
  onClick?: () => void;
};
