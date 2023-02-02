import { Box, Button, Text, Truncate } from "@twilio-paste/core";
import { Media } from "@twilio/conversations";
import { ReduxMedia } from "../../store/reducers/messageListReducer";
import React from "react";
import {FaCross, FaFile} from "react-icons/all";

type MessageFileProps = {
  media: ReduxMedia | { filename: string; size: number };
  onRemove?: () => void;
};

const MessageFile: React.FC<MessageFileProps> = ({
  media,
  onRemove,
}: MessageFileProps) => {
  const { filename, size } = media;
  const name = filename ?? "";
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        padding: "12px 16px",
        margin: "6px 6px 0 6px",
        border: "1px solid #CACDD8",
        boxSizing: "border-box",
        borderRadius: "4px",
        width: "calc(25% - 20px)",
        maxWidth: "200px",
        minWidth: "150px",
        backgroundColor: "#fff",
        cursor: "default",
      }}
    >
      <Box
        style={{
          marginRight: "16px",
          alignItems: "start",
        }}
      >
        <FaFile
          title="Open File"
          size="60"
          color="colorTextLink"
          style={{
            fontWeight: "bold",
          }}
        />
      </Box>

      <Box
        style={{
          maxWidth: "calc(100% - 42px)",
        }}
      >
        <Text as="p" fontWeight="fontWeightMedium">
          <Truncate title={name}>{name}</Truncate>
        </Text>
        <Text as="p" color="colorTextInverseWeaker">
          {Math.round((size / Math.pow(2, 20)) * 100) / 100} MB
        </Text>
      </Box>

      {onRemove ? (
        <Button variant="link" onClick={onRemove}>
          <Box
            style={{
              backgroundColor: "#06033A",
              borderRadius: "10px",
              top: "-45px",
              position: "absolute",
              left: "2%",
            }}
          >
            <FaCross
              title="Remove file"
              color="colorTextBrandInverse"
            />
          </Box>
        </Button>
      ) : null}
    </Box>
  );
};

export default MessageFile;
