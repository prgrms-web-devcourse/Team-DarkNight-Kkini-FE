import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

type FoodPartyDetailCheckChangeStatusModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onClickYes: () => void;
};

const FoodPartyDetailCheckChangeStatusModal = ({
  isOpen,
  onClose,
  onClickYes,
}: FoodPartyDetailCheckChangeStatusModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalBody>
          <Button
            onClick={() => {
              onClickYes();
              onClose();
            }}>
            네!
          </Button>
          <Button onClick={onClose}>아니요...</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FoodPartyDetailCheckChangeStatusModal;
