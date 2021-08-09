import {
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  useDisclosure,
  Modal,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

import type { Record } from "types";

interface RecordItemProps {
  record: Record;
  deleteRecord: () => Promise<void | null>;
}
export default function RecordItem({ record, deleteRecord }: RecordItemProps) {
  const hoverBG = useColorModeValue("base.50", "base.800");
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      _hover={{ bg: hoverBG }}
      px={2}
      borderRadius="8"
    >
      <Stat>
        <StatLabel>Date: {record.date}</StatLabel>
        <StatNumber>{record.value}</StatNumber>
      </Stat>
      <DeleteRecordModal onDelete={deleteRecord} />
    </Flex>
  );
}

function DeleteRecordModal({
  onDelete,
}: {
  onDelete: () => Promise<void | null>;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button w="fit-content" colorScheme="red" onClick={onOpen}>
        Delete Record
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent py={4}>
          <ModalCloseButton />
          <ModalHeader>Delete Record</ModalHeader>
          <ModalBody>
            <Button colorScheme="red" onClick={onDelete}>
              Confirm
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
