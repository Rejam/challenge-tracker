import { Box, Flex, GridItem, SimpleGrid } from "@chakra-ui/react";

import AddChallenge from "components/AddChallenge";
import ChallengeCard from "components/ChallengeCard";
import useChallenges from "lib/hooks/useChallenges";

export default function Home() {
  const { addChallenge, challenges } = useChallenges();

  return (
    <Box as="main">
      <SimpleGrid gap={[4, null, 8]} mt={[2, null, 4]}>
        <Flex justifyContent="flex-end">
          <AddChallenge addChallenge={addChallenge} />
        </Flex>
        <SimpleGrid
          gap={[4, null, 8]}
          gridTemplateColumns={[
            "repeat(auto-fit, minmax(280px, 1fr))",
            null,
            "repeat(auto-fit, minmax(320px, 1fr))",
            "repeat(auto-fit, minmax(400px, 1fr))",
            "repeat(auto-fit, minmax(450px, 1fr))",
          ]}
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
