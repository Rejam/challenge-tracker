import { Box, GridItem, Heading, SimpleGrid } from "@chakra-ui/react";

import AddChallenge from "components/AddChallenge";
import ChallengeCard from "components/ChallengeCard";
import useChallenges from "lib/hooks/useChallenges";

export default function Home() {
  const { addChallenge, challenges } = useChallenges();
  return (
    <Box as="main">
      <SimpleGrid gap={8}>
        <Heading as="h1">Challenge Tracker</Heading>

        <AddChallenge addChallenge={addChallenge} />
        <SimpleGrid
          gap={8}
          gridTemplateColumns={"repeat(auto-fit, minmax(300px, 1fr))"}
        >
          {challenges &&
            challenges.map((challenge) => (
              <GridItem key={challenge.id} style={{ display: "flex" }}>
                <ChallengeCard challenge={challenge} />
              </GridItem>
            ))}
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
}
