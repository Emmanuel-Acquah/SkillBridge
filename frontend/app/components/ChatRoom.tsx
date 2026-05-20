import React, { useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Paperclip,
  Image as ImageIcon,
  Smile,
  Send,
} from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../contexts/ThemeContext";

import ChatBubble from "../shared/ChatBubble";

interface Message {
  id: string;
  type: "text" | "image" | "file";
  text?: string;
  imageUri?: string;
  fileName?: string;
  fileSize?: string;
  fileDate?: string;
  timestamp: string;
  isMine: boolean;
  showAvatar?: boolean;
}

const MOCK_MESSAGES: Message[] = [
  {
    id: "1",
    type: "text",
    text: "Hello! I've just uploaded the updated brand guidelines for the new dashboard. Can you please take a look at the color palette on page 4?",
    timestamp: "10:24 AM",
    isMine: false,
    showAvatar: true,
  },
  {
    id: "2",
    type: "file",
    fileName: "Project_Brief_V2.pdf",
    fileSize: "4.2 MB",
    fileDate: "Oct 24, 2023",
    timestamp: "10:25 AM",
    isMine: false,
  },
  {
    id: "3",
    type: "text",
    text: "Received! The new sapphire blue looks much more premium than the previous iteration. I'll update the components by EOD.",
    timestamp: "10:45 AM",
    isMine: true,
  },
  {
    id: "4",
    type: "text",
    text: "I've reviewed the feedback and updated the navigation icons to a 1.5px stroke weight. Does this feel more aligned with the brand's typography?",
    timestamp: "11:05 AM",
    isMine: true,
  },
  {
    id: "5",
    type: "image",
    imageUri: "https://picsum.photos/300/200",
    fileName: "dashboard_preview_final.png",
    timestamp: "11:06 AM",
    isMine: true,
  },
];

const ChatRoom = () => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const flatListRef = useRef<FlatList>(null);
  const [messageText, setMessageText] = useState("");

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.background,
            paddingTop: Platform.OS === "ios" ? insets.top : insets.top + 10,
          },
        ]}
      >
        {/* Header */}
        <View
          style={[
            styles.header,
            {
              borderBottomColor: theme.colors.borderLight,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
            style={[styles.headerBtn, { backgroundColor: theme.colors.surfaceSecondary }]}
          >
            <ArrowLeft size={20} color={theme.colors.textPrimary} strokeWidth={2} />
          </TouchableOpacity>

          <View style={styles.headerInfo}>
            <View style={[styles.headerAvatar, { backgroundColor: theme.colors.primaryFaded }]}>
              <Text style={[styles.headerInitial, { color: theme.colors.primary, fontFamily: theme.fonts.bold }]}>
                AW
              </Text>
            </View>
            <View>
              <Text style={[styles.headerName, { color: theme.colors.textPrimary, fontFamily: theme.fonts.semiBold }]}>
                Alexander Wright
              </Text>
              <View style={styles.onlineRow}>
                <View style={[styles.onlineDot, { backgroundColor: theme.colors.success }]} />
                <Text style={[styles.onlineText, { color: theme.colors.success, fontFamily: theme.fonts.medium }]}>
                  Online
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.headerBtn} />
        </View>

        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={MOCK_MESSAGES}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.dateHeader}>
              <View style={[styles.dateLine, { backgroundColor: theme.colors.border }]} />
              <Text style={[styles.dateText, { color: theme.colors.textLight, fontFamily: theme.fonts.medium, backgroundColor: theme.colors.background }]}>
                Yesterday, Oct 24
              </Text>
              <View style={[styles.dateLine, { backgroundColor: theme.colors.border }]} />
            </View>
          }
          renderItem={({ item }) => (
            <ChatBubble
              type={item.type}
              text={item.text}
              imageUri={item.imageUri}
              fileName={item.fileName}
              fileSize={item.fileSize}
              fileDate={item.fileDate}
              timestamp={item.timestamp}
              isMine={item.isMine}
              showAvatar={item.showAvatar}
              senderInitial="A"
            />
          )}
        />

        {/* Quick Actions */}
        <View style={[styles.quickActions, { borderTopColor: theme.colors.borderLight }]}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.quickBtn, { borderColor: theme.colors.border, backgroundColor: theme.colors.surface }]}
          >
            <Paperclip size={14} color={theme.colors.textSecondary} strokeWidth={2} />
            <Text style={[styles.quickBtnText, { color: theme.colors.textSecondary, fontFamily: theme.fonts.medium }]}>
              Upload File
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.quickBtn, { borderColor: theme.colors.border, backgroundColor: theme.colors.surface }]}
          >
            <ImageIcon size={14} color={theme.colors.textSecondary} strokeWidth={2} />
            <Text style={[styles.quickBtnText, { color: theme.colors.textSecondary, fontFamily: theme.fonts.medium }]}>
              Share Image
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.quickBtn, { borderColor: theme.colors.border, backgroundColor: theme.colors.surface }]}
          >
            <Smile size={14} color={theme.colors.textSecondary} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Input Bar */}
        <View
          style={[
            styles.inputBar,
            {
              backgroundColor: theme.colors.background,
              paddingBottom: Platform.OS === "ios" ? insets.bottom : 12,
              borderTopColor: theme.colors.borderLight,
            },
          ]}
        >
          <View
            style={[
              styles.inputContainer,
              {
                backgroundColor: theme.colors.inputBackground,
                borderColor: theme.colors.inputBorder,
              },
            ]}
          >
            <Smile size={20} color={theme.colors.textLight} strokeWidth={1.8} />
            <TextInput
              value={messageText}
              onChangeText={setMessageText}
              placeholder="Type your message..."
              placeholderTextColor={theme.colors.inputPlaceholder}
              style={[
                styles.input,
                { color: theme.colors.inputText, fontFamily: theme.fonts.regular },
              ]}
              multiline
              selectionColor={theme.colors.primary}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.sendBtn,
              {
                backgroundColor: messageText.trim()
                  ? theme.colors.primary
                  : theme.colors.border,
              },
            ]}
          >
            <Send
              size={18}
              color={messageText.trim() ? theme.colors.textOnPrimary : theme.colors.textLight}
              strokeWidth={2.5}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  headerInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginLeft: 8,
  },
  headerAvatar: {
    width: 38,
    height: 38,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  headerInitial: {
    fontSize: 14,
  },
  headerName: {
    fontSize: 15,
  },
  onlineRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 1,
  },
  onlineDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  onlineText: {
    fontSize: 11,
  },
  // Messages
  messagesList: {
    paddingVertical: 12,
  },
  dateHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  dateLine: {
    flex: 1,
    height: 1,
  },
  dateText: {
    fontSize: 12,
    paddingHorizontal: 12,
  },
  // Quick actions
  quickActions: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  quickBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  quickBtnText: {
    fontSize: 12,
  },
  // Input
  inputBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    borderRadius: 24,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === "ios" ? 10 : 6,
    gap: 8,
    minHeight: 46,
  },
  input: {
    flex: 1,
    fontSize: 14,
    maxHeight: 100,
    paddingTop: Platform.OS === "ios" ? 2 : 0,
  },
  sendBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Platform.OS === "ios" ? 0 : 0,
  },
});

export default ChatRoom;
