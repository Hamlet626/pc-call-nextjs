import React, { useState } from "react";
import { Client } from "@twilio/conversations";
import { Box } from "@twilio-paste/core";

import CreateConversationButton from "./CreateConversationButton";
import ConversationsList from "./ConversationsList";
import styles from "../../styles";
import {BiChevronLeft, BiChevronRight} from "react-icons/all";

interface ConvosContainerProps {
  client?: Client;
}

const ConversationsContainer: React.FC<ConvosContainerProps> = (
  props: ConvosContainerProps
) => {
  const [listHidden, hideList] = useState(false);

  return (
    <Box
      style={
        listHidden
          ? { ...styles.convosWrapper, ...styles.collapsedList }
          : styles.convosWrapper
      }
    >
      <Box style={styles.newConvoButton}>
        <CreateConversationButton
          client={props.client}
          collapsed={listHidden}
        />
      </Box>
      <Box style={styles.convoList}>
        {!listHidden ? <ConversationsList /> : null}
      </Box>
      <Box style={styles.collapseButtonBox}>
        <Box
          paddingTop="space30"
          style={{
            paddingLeft: 10,
            paddingRight: 10,
          }}
          onClick={() => hideList(!listHidden)}
        >
          {listHidden ? (
              <div>Expand <BiChevronRight title="Expand"/></div>
          ) : (
              <div>Collapse <BiChevronLeft title="Collapse"/></div>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ConversationsContainer;
