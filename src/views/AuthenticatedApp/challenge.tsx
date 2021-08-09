import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
  useColorModeValue,
  Modal,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
  Grid,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

import AddRecord from "components/AddRecord";
import useChallenge from "lib/hooks/useChallenge";
import type { ChallengeUnits, Record } from "types";
import RecordItem from "components/RecordItem";

const getTotal = (total: number, record: Record) => (total += record.value);

export default function Challenge() {
  const { id } = useParams();
  const {
    challenge,
    loading,
    error,
    addRecord,
    deleteRecord,
    deleteChallenge,
  } = useChallenge(id);
  const bg = useColorModeValue("white", "base.900");

  if (error) return <div>Error</div>;
  if (loading) return <Spinner />;
  if (!challenge) return <div>Unable to retrieve challenge</div>;

  const records: Record[] = challenge.records || [];
  const currentTotal = records.reduce(getTotal, 0);
  const progressPercent = Math.round((currentTotal / challenge.target) * 100);
  const recordsByDate = Object.entries(
    records.reduce((grouped: { [key: string]: Record[] }, record: Record) => {
      const key = record.date;
      if (grouped[key]) return { ...grouped, [key]: [record, ...grouped[key]] };
      return { ...grouped, [key]: [record] };
    }, {})
  );

  return (
    <Box mt={[4, null, 8]} p={[4, null, 8]} shadow="md" bg={bg}>
      <Heading as="h2">{challenge.name}</Heading>
      <SimpleGrid mt={8} gap={[4, null, 8]}>
        <Box maxW={600} mx="auto">
          <SimpleGrid gap={[4]} columns={[1, null, 2]} placeItems="center">
            <CircularProgress
              size="120px"
              thickness="15px"
              value={progressPercent}
              color="green.400"
            >
              <CircularProgressLabel>{progressPercent}%</CircularProgressLabel>
            </CircularProgress>
            <Text fontWeight={500} fontSize={"2xl"} mb={2}>
              {currentTotal}/{challenge.target} {challenge.units}
            </Text>
          </SimpleGrid>
        </Box>
        <Box w="100%" maxW={600} mx="auto">
          <AddRecord onSubmit={addRecord} />
        </Box>
        <RecordsAccordion
          records={recordsByDate}
          unit={challenge.units}
          deleteRecord={deleteRecord}
        />
      </SimpleGrid>

      <DeleteChallengeModal onDelete={deleteChallenge} />
    </Box>
  );
}

function DeleteChallengeModal({
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

function RecordsAccordion({
  records,
  unit,
  deleteRecord,
}: {
  records: [string, Record[]][];
  unit: ChallengeUnits;
  deleteRecord: any;
}) {
  const headerBg = useColorModeValue("base.50", "base.800");

  return (
    <Accordion allowMultiple colorScheme="red">
      {records.map(([key, groupedRecords]) => {
        return (
          <AccordionItem key={key}>
            <AccordionButton
              // as="h4"
              // p={2}
              // fontSize="lg"
              bg={headerBg}
            >
              <Text flex={1} textAlign="start" textTransform="uppercase">
                {key}
              </Text>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              {groupedRecords.map((record: Record) => (
                <RecordItem
                  key={record.id}
                  record={record}
                  unit={unit}
                  deleteRecord={deleteRecord(record.id)}
                />
              ))}
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
