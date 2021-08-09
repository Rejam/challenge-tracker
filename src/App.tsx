import { Box, Container, useColorModeValue } from "@chakra-ui/react";

import Header from "components/Header";
import AuthenticatedApp from "views/AuthenticatedApp";
import LoginView from "views/Login";
import useAuth from "lib/hooks/useAuth";

export default function App() {
  const bg = useColorModeValue(
    "rgba(255, 255, 255, 0.8)",
    "rgba(0, 0, 0, 0.7)"
  );
  return (
    <Box bgGradient="linear( base.500, accent.500)" minH="100vh">
      <Box w="inherit" h="inherit" minH="inherit" bg={bg}>
        <Header />
        <Container px={[4, null, 8]} maxW={["100%", null, null]}>
          <Content />
        </Container>
      </Box>
    </Box>
  );
}

function Content() {
  const auth = useAuth();

  if (!auth.user) return <LoginView />;
  return <AuthenticatedApp />;
}
