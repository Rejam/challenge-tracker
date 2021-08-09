import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import AddChallengeForm from "./form";

export default function AddChallenge({ addChallenge }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button w="fit-content" colorScheme="accent" onClick={onOpen}>
        Add Challenge
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent py={4}>
          <ModalCloseButton />
          <ModalHeader>Create a new Challenge</ModalHeader>
          <ModalBody>
            <AddChallengeForm
              onSubmit={(challenge) => {
                return addChallenge(challenge).then(onClose);
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
