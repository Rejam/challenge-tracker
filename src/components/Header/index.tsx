import { Link } from "react-router-dom";
import {
  Box,
  Button,
  HStack,
  useColorMode,
  Link as ChakraLink,
} from "@chakra-ui/react";

import useAuth from "lib/hooks/useAuth";

export default function Header() {
  const auth = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box as="header" py={2} px={3}>
      <HStack justifyContent="space-between">
        <ChakraLink as={Link} to="/">
          Home
        </ChakraLink>
        <HStack>
          <Button borderRadius={0} onClick={toggleColorMode}>
            Toggle {colorMode === "light" ? "🌙" : "🌞"}
          </Button>
          <Button borderRadius={0} onClick={auth.signOut}>
            Sign out
          </Button>
        </HStack>
      </HStack>
    </Box>
  );
}
