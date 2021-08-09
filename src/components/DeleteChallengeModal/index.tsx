import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

export default function DeleteChallengeModal({
  onDelete,
}: {
  onDelete: () => Promise<void | null>;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box
        mt={8}
        border="2px solid"
        borderColor="red"
        borderRadius={8}
        p={[4, null, 8]}
        textAlign="center"
      >
        <Button w="fit-content" colorScheme="red" onClick={onOpen}>
          Delete Challenge
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent py={4}>
          <ModalCloseButton />
          <ModalHeader>Delete Challenge</ModalHeader>
          <ModalBody>
            <Button colorScheme="red" onClick={() => onDelete().then(onClose)}>
              Confirm
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
