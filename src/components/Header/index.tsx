import { Box, Button, Container, HStack, useColorMode } from "@chakra-ui/react";

import useAuth from "lib/hooks/useAuth";

export default function Header() {
  const auth = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box as="header" shadow="md" py={2} px={8}>
      <Container>
        <HStack justifyContent="flex-end">
          <Button onClick={toggleColorMode}>
            Toggle {colorMode === "light" ? "🌙" : "🌞"}
          </Button>
          <Button onClick={auth.signOut}>Sign out</Button>
        </HStack>
      </Container>
    </Box>
  );
}
