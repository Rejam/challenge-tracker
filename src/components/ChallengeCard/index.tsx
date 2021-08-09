import { Link } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  useColorModeValue,
  Progress,
  Link as ChakraLink,
  Button,
} from "@chakra-ui/react";

import AddRecord from "components/AddRecord";
import useChallenge from "lib/hooks/useChallenge";
import type { Challenge, Record } from "types";

interface ChallengeCardProps {
  challenge: Challenge;
}

export default function ChallengeCard({ challenge }: ChallengeCardProps) {
  const bg = useColorModeValue("white", "base.900");
  const { addRecord } = useChallenge(challenge.id);
  const records = challenge.records || [];
  const currentTotal = records.reduce(
    (total: number, record: Record) => (total += record.value),
    0
  );

  const progressPercent = (currentTotal / challenge.target) * 100;

  const linkUrl = `/challenges/${challenge.id}`;
  return (
    <Box bg={bg} shadow="md" p={[4, null, 8]} w="100%">
      <SimpleGrid gap={[4]}>
        <ChakraLink as={Link} to={linkUrl}>
          <Heading as="h3">{challenge.name}</Heading>
        </ChakraLink>

        <Text>
          Target: {currentTotal} / {challenge.target} {challenge.units}
        </Text>
        <Progress
          h={30}
          colorScheme="green"
          hasStripe
          value={progressPercent}
        />
        <AddRecord onSubmit={addRecord} />
        <Button as={Link} to={linkUrl}>
          View {challenge.name} details
        </Button>
      </SimpleGrid>
    </Box>
  );
}
