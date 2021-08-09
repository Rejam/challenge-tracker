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
    <Box as="header" py={[2, null, 4]} px={[4, null, 8]}>
      <HStack justifyContent="space-between">
        <ChakraLink as={Link} to="/">
          Challenge Tracker
        </ChakraLink>
        <HStack>
          {auth.user && (
            <Button borderRadius={0} onClick={auth.signOut}>
              Sign out
            </Button>
          )}
          <Button borderRadius={0} onClick={toggleColorMode}>
            Toggle {colorMode === "light" ? "🌙" : "🌞"}
          </Button>
        </HStack>
      </HStack>
    </Box>
  );
}
