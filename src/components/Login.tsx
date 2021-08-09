import { Container, Heading, Button, Text, SimpleGrid } from "@chakra-ui/react";

import type { SignupMethod } from "types";

interface LoginViewProps {
  signupMethods: SignupMethod[];
}
export default function LoginView({ signupMethods }: LoginViewProps) {
  return (
    <Container>
      <SimpleGrid gap={4} mt={[4, null, 8]} p={[4, null, 8]} shadow="md">
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
