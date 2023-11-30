import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';

type Props = {
  isActived: boolean;
  handleModal: () => void;
};

export default function ModalEditGame({ isActived, handleModal }: Props) {
  return (
    <div>
      <Modal backdrop="blur" isOpen={isActived} onClose={handleModal}>
        <ModalContent>
          <ModalHeader>Edit Game</ModalHeader>
          <ModalBody>body</ModalBody>
          <ModalFooter>footer</ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
