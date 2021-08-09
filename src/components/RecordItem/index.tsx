import {
  Flex,
  Text,
  useDisclosure,
  Modal,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Button,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";

import type { ChallengeUnits, Record } from "types";

interface RecordItemProps {
  record: Record;
  deleteRecord: () => Promise<void | null>;
  unit: ChallengeUnits;
}
export default function RecordItem({
  record,
  deleteRecord,
  unit,
}: RecordItemProps) {
  const hoverBG = useColorModeValue("gray.100", "gray.800");
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      _hover={{ bg: hoverBG }}
      px={2}
      mb={1}
      borderRadius="8"
    >
      <Stack direction="row">
        {/* <Text>{record.date}</Text> */}
        <Text>
          {record.value} {unit}
        </Text>
      </Stack>
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
      <Button
        my={2}
        w="fit-content"
        colorScheme="red"
        onClick={onOpen}
        variant="outline"
        h={8}
      >
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
