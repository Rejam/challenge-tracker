import { Container, Heading, Button, Text, SimpleGrid } from "@chakra-ui/react";

import type { SignupMethod } from "types";

interface LoginViewProps {
  signupMethods: SignupMethod[];
}
export default function LoginView({ signupMethods }: LoginViewProps) {
  return (
    <Container mt={[8, 16, 32]} p={8} shadow="md">
      <SimpleGrid gap={4}>
        <Heading as="h1">Challenge Tracker</Heading>
        <Text>Sign in with:</Text>
        {signupMethods.map((signup) => (
          <Button w="fit-content" key={signup.name} onClick={signup.method}>
            {signup.name}
          </Button>
        ))}
      </SimpleGrid>
    </Container>
  );
}
