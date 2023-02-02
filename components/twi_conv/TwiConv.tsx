import { Provider } from "react-redux";
import { store } from "./store";
import { Theme } from "@twilio-paste/core/theme";
import { Box } from "@twilio-paste/core";

import App from "./components/App";
import styles from "./styles";
import { MContext } from "./components/ExternalArgsContainer";
import React from "react";

type TwiConvArgs = {
  args: any;
};

export const TwiConv = ({ args }: TwiConvArgs) => {
  return (
    <Box style={styles.app}>
      <React.StrictMode>
        <Provider store={store}>
          <Theme.Provider theme="default">
            <Box style={styles.app}>
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" />
              <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
                rel="stylesheet"
              ></link>
              <MContext.Provider value={args}>
                <App />
              </MContext.Provider>
            </Box>
          </Theme.Provider>
        </Provider>
      </React.StrictMode>
    </Box>
  );
};
