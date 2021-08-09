import { useParams } from "react-router-dom";
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import AddRecord from "components/AddRecord";
import useChallenge from "lib/hooks/useChallenge";
import DeleteChallengeModal from "components/DeleteChallengeModal";
import RecordsAccordion from "components/RecordsAccordion";
import type { Record } from "types";

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
  const bg = useColorModeValue("gray.50", "gray.900");

  if (error) return <div>Error</div>;
  if (loading) return <Spinner />;
  if (!challenge) return <div>Unable to retrieve challenge</div>;

  const records: Record[] = challenge.records || [];
  const currentTotal = records.reduce(getTotal, 0);
  const progressPercent = Math.round((currentTotal / challenge.target) * 100);
  const recordsByDate = records.reduce(
    (grouped: { [key: string]: Record[] }, record: Record) => {
      const key = record.date;
      if (grouped[key]) return { ...grouped, [key]: [record, ...grouped[key]] };
      return { ...grouped, [key]: [record] };
    },
    {}
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
