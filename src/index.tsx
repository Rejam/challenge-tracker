import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
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
  colors: {
    base: ChakraTheme.colors.blue,
    accent: ChakraTheme.colors.pink,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
