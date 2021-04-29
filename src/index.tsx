import { CSSReset, ThemeProvider } from "@chakra-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { Provider } from 'mobx-react';
import stores from "./store";

ReactDOM.render(
  <Provider {...stores}>
    <ThemeProvider>
      <CSSReset />
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);