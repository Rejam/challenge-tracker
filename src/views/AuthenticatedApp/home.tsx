import {
  Box,
  Container,
  Heading,
  ListItem,
  SimpleGrid,
  UnorderedList,
} from "@chakra-ui/react";
import AddChallenge from "components/AddChallenge";
import ChallengeCard from "components/ChallengeCard";
import useChallenges from "lib/hooks/useChallenges";

export default function Home() {
  const { addChallenge, challenges } = useChallenges();

  return (
    <Container>
      <Box as="main" mt={[8]} p={[8]} shadow="md">
        <SimpleGrid gap={8}>
          <Heading as="h1">Challenge Tracker</Heading>
          <Box p={4} border="1px solid" borderColor="gray.200" bg="gray.50">
            <AddChallenge onSubmit={addChallenge} />
          </Box>
          <UnorderedList>
            {challenges &&
              challenges.map((challenge) => (
                <ListItem key={challenge.id} style={{ display: "flex" }}>
                  <ChallengeCard challenge={challenge} />
                </ListItem>
              ))}
          </UnorderedList>
        </SimpleGrid>
      </Box>
    </Container>
  );
}
