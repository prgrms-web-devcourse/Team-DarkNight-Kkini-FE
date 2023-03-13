import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { FoodPartyDetailStatusButtonText } from 'types/foodParty';

type FoodPartyDetailCheckChangeStatusModalProps = {
  foodPartyDetailStatusButtonText: FoodPartyDetailStatusButtonText;
  isOpen: boolean;
  onClose: () => void;
  onClickYes: () => void;
};

const FoodPartyDetailCheckChangeStatusModal = ({
  foodPartyDetailStatusButtonText,
  isOpen,
  onClose,
  onClickYes,
}: FoodPartyDetailCheckChangeStatusModalProps) => {
  let modalHeaderText;

  switch (foodPartyDetailStatusButtonText) {
    case '모집 완료할끼니?':
      modalHeaderText = '모집을 완료하시겠습니까?';
      break;
    case '식사를 완료했끼니?':
      modalHeaderText = '식사를 종료하시겠습니까?';
      break;
    default:
      modalHeaderText = '증말로!?';
      break;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset='slideInBottom'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign='center'>{modalHeaderText}</ModalHeader>
        <ModalBody>
          <Flex justifyContent='center' alignItems='center' gap='1rem'>
            <Button
              onClick={() => {
                onClickYes();
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

export default FoodPartyDetailCheckChangeStatusModal;
