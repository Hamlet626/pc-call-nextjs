import { Avatar } from "@twilio-paste/avatar";
import { Text } from "@twilio-paste/core";
import { Menu, MenuButton, useMenuState, MenuItem } from "@twilio-paste/menu";
import React, { useMemo } from "react";
import styles from "../styles";
import { ConnectionState } from "@twilio/conversations";
import {FaChevronDown, FaFontAwesomeLogoFull} from "react-icons/all";

type AppHeaderProps = {
  user: string;
  onSignOut: () => void;
  connectionState: ConnectionState;
};
const AppHeader: React.FC<AppHeaderProps> = ({
  user,
  onSignOut,
  connectionState,
}) => {
  const menu = useMenuState();

  const label: "online" | "connecting" | "offline" = useMemo(() => {
    switch (connectionState) {
      case "connected":
        return "online";
      case "connecting":
        return "connecting";
      default:
        return "offline";
    }
  }, [connectionState]);

  return (
    <div style={styles.appHeader}>
      <div style={styles.flex}>
        <FaFontAwesomeLogoFull
          color="colorTextInverse"
          size="70"
          title="app logo"
        />
        <div style={styles.appLogoTitle}>Twilio Conversations</div>
      </div>
      <div style={styles.userTile}>
        <Avatar size="sizeIcon70" name="avatar example"/>
        <div
          style={{
            padding: "0 10px",
          }}
        >
          {user}
          <Text
            as="span"
            color={
              label === "online"
                ? "colorTextIconAvailable"
                : label === "connecting"
                ? "colorTextIconBusy"
                : "colorTextIconError"
            }
            style={{
              fontSize: "10px",
              display: "block",
              paddingTop: 5,
              lineHeight: 0,
            }}
          >
            {label === "online"
              ? "Online"
              : label === "connecting"
              ? "Connecting…"
              : "Offline"}
          </Text>
        </div>
        <MenuButton {...menu} variant="link" size="reset">
          <FaChevronDown
            color="colorTextInverse"
            title="Settings"
          />
        </MenuButton>
        <Menu {...menu} aria-label="Preferences">
          <MenuItem {...menu} onClick={onSignOut}>
            Sign Out
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default AppHeader;
