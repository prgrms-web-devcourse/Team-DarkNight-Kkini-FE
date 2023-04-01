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
  onClickYesButton: () => void;
};

const FoodPartyDetailCheckChangeStatusModal = ({
  foodPartyDetailStatusButtonText,
  isOpen,
  onClose,
  onClickYesButton,
}: FoodPartyDetailCheckChangeStatusModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset='slideInBottom'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign='center'>
          {getModalHeaderText(foodPartyDetailStatusButtonText)}
        </ModalHeader>
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

export default FoodPartyDetailCheckChangeStatusModal;

const getModalHeaderText = (
  foodPartyDetailStatusButtonText: FoodPartyDetailStatusButtonText
) => {
  switch (foodPartyDetailStatusButtonText) {
    case '모집 완료할끼니?':
      return '모집을 완료하시겠습니까?';
    case '식사를 완료했끼니?':
      return '식사를 종료하시겠습니까?';
    default:
      return '증말로!?';
  }
};
