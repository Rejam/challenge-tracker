import React from "react";
import ReactDOM from "react-dom";
import {
  ChakraProvider,
  extendTheme,
  ColorModeScript,
  withDefaultColorScheme,
  theme as ChakraTheme,
} from "@chakra-ui/react";

import "lib/firebase";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const theme = extendTheme(withDefaultColorScheme({ colorScheme: "blue" }), {
  config: { useSystemColorMode: true },
  base: ChakraTheme.colors.pink,
});

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
