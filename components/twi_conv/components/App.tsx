import { ReactElement } from "react";

import {Box, Spinner, Text} from "@twilio-paste/core";
import AppContainer from "./AppContainer";
import React from "react";
import {useAtom} from "jotai";
import {twiClient} from "../../../utils/provider";

function App(): ReactElement {
  const [client,] = useAtom(twiClient);

  if (client.state!=="hasData") {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="absolute"
        height="100%"
        width="100%"
      >
        {client.state==="loading"?
            <Spinner size="sizeIcon110" decorative={false} title="Loading" />:
            <Text as={"p"}>{client.error?.toString()}</Text>}
      </Box>
    );
  }

  return <AppContainer client={client.data}/>;
}

export default App;
