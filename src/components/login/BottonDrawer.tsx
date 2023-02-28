import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

type BottomDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  header: ReactNode;
  body: ReactNode;
};

const BottomDrawer = ({ isOpen, onClose, header, body }: BottomDrawerProps) => {
  return (
    <Drawer placement='bottom' onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent
        borderTopRadius='1rem'
        style={{ maxWidth: '570px', margin: '0 auto' }}>
        <DrawerHeader borderBottomWidth='1px'>{header}</DrawerHeader>
        <DrawerBody>{body}</DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default BottomDrawer;
