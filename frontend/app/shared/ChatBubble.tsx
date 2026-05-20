import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from "react-native";
import { FileText, Download } from "lucide-react-native";
import { useTheme } from "../contexts/ThemeContext";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const MAX_BUBBLE_WIDTH = SCREEN_WIDTH * 0.75;

type MessageType = "text" | "image" | "file";

interface ChatBubbleProps {
  type?: MessageType;
  text?: string;
  imageUri?: string;
  fileName?: string;
  fileSize?: string;
  fileDate?: string;
  timestamp: string;
  isMine: boolean;
  showAvatar?: boolean;
  avatarUri?: string;
  senderInitial?: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  type = "text",
  text,
  imageUri,
  fileName,
  fileSize,
  fileDate,
  timestamp,
  isMine,
  showAvatar = false,
  avatarUri,
  senderInitial,
}) => {
  const { theme } = useTheme();

  const bubbleBg = isMine ? theme.colors.primary : theme.colors.surfaceSecondary;
  const textColor = isMine ? theme.colors.textOnPrimary : theme.colors.textPrimary;
  const timeColor = isMine ? "rgba(255,255,255,0.6)" : theme.colors.textLight;

  return (
    <View style={[styles.row, isMine ? styles.rowRight : styles.rowLeft]}>
      {/* Avatar (other person only) */}
      {!isMine && showAvatar && (
        avatarUri ? (
          <Image source={{ uri: avatarUri }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatarFallback, { backgroundColor: theme.colors.primaryFaded }]}>
            <Text style={[styles.avatarText, { color: theme.colors.primary, fontFamily: theme.fonts.bold }]}>
              {senderInitial || "?"}
            </Text>
          </View>
        )
      )}
      {!isMine && !showAvatar && <View style={styles.avatarSpacer} />}

      <View style={[styles.bubble, { backgroundColor: bubbleBg, maxWidth: MAX_BUBBLE_WIDTH }, isMine ? styles.bubbleRight : styles.bubbleLeft]}>
        {/* Text message */}
        {type === "text" && text && (
          <Text style={[styles.text, { color: textColor, fontFamily: theme.fonts.regular }]}>
            {text}
          </Text>
        )}

        {/* Image message */}
        {type === "image" && imageUri && (
          <View>
            <Image
              source={{ uri: imageUri }}
              style={styles.image}
              resizeMode="cover"
            />
            {fileName && (
              <Text
                style={[
                  styles.imageCaption,
                  {
                    color: isMine ? "rgba(255,255,255,0.8)" : theme.colors.textSecondary,
                    fontFamily: theme.fonts.regular,
                  },
                ]}
                numberOfLines={1}
              >
                {fileName}
              </Text>
            )}
          </View>
        )}

        {/* File message */}
        {type === "file" && (
          <TouchableOpacity activeOpacity={0.7} style={styles.fileRow}>
            <View
              style={[
                styles.fileIcon,
                {
                  backgroundColor: isMine ? "rgba(255,255,255,0.2)" : theme.colors.primaryFaded,
                },
              ]}
            >
              <FileText
                size={18}
                color={isMine ? theme.colors.textOnPrimary : theme.colors.primary}
                strokeWidth={2}
              />
            </View>
            <View style={styles.fileInfo}>
              <Text
                style={[
                  styles.fileName,
                  { color: textColor, fontFamily: theme.fonts.semiBold },
                ]}
                numberOfLines={1}
              >
                {fileName || "Document"}
              </Text>
              <Text
                style={[
                  styles.fileMeta,
                  {
                    color: isMine ? "rgba(255,255,255,0.6)" : theme.colors.textLight,
                    fontFamily: theme.fonts.regular,
                  },
                ]}
              >
                {fileSize}{fileDate ? ` · ${fileDate}` : ""}
              </Text>
            </View>
            <Download
              size={16}
              color={isMine ? "rgba(255,255,255,0.6)" : theme.colors.textLight}
              strokeWidth={2}
            />
          </TouchableOpacity>
        )}

        {/* Timestamp */}
        <Text style={[styles.time, { color: timeColor, fontFamily: theme.fonts.regular }]}>
          {timestamp}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginBottom: 6,
    paddingHorizontal: 12,
  },
  rowLeft: {
    justifyContent: "flex-start",
  },
  rowRight: {
    justifyContent: "flex-end",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 10,
    marginRight: 8,
    marginTop: 4,
  },
  avatarFallback: {
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    marginTop: 4,
  },
  avatarText: {
    fontSize: 12,
  },
  avatarSpacer: {
    width: 38,
  },
  bubble: {
    borderRadius: 18,
    padding: 12,
  },
  bubbleLeft: {
    borderTopLeftRadius: 4,
  },
  bubbleRight: {
    borderTopRightRadius: 4,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
  },
  // Image
  image: {
    width: MAX_BUBBLE_WIDTH - 24,
    height: 160,
    borderRadius: 12,
    marginBottom: 4,
  },
  imageCaption: {
    fontSize: 12,
    marginTop: 4,
  },
  // File
  fileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  fileIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 13,
  },
  fileMeta: {
    fontSize: 11,
    marginTop: 1,
  },
  // Time
  time: {
    fontSize: 10,
    marginTop: 6,
    alignSelf: "flex-end",
  },
});

export default ChatBubble;
