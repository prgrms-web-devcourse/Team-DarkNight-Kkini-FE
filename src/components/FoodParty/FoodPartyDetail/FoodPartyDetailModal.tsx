import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

type FoodPartyDetailModalProps = {
  headerText: string;
  isOpen: boolean;
  onClose: () => void;
  onClickYesButton: () => void;
};

const FoodPartyDetailModal = ({
  headerText,
  isOpen,
  onClose,
  onClickYesButton,
}: FoodPartyDetailModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset='slideInBottom'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign='center'>{headerText}</ModalHeader>
        <ModalBody>
          <Flex justifyContent='center' alignItems='center' gap='1rem'>
            <Button
              onClick={() => {
                onClickYesButton();
                onClose();
              }}>
              네!
            </Button>
            <Button onClick={onClose}>아니요...</Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FoodPartyDetailModal;
