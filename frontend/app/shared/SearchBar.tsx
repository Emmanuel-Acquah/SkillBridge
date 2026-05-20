import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Search, SlidersHorizontal } from "lucide-react-native";
import { useTheme } from "../contexts/ThemeContext";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  showFilter?: boolean;
  onFilterPress?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = "Search requests, clients, or projects...",
  showFilter = false,
  onFilterPress,
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: theme.colors.inputBackground,
            borderColor: theme.colors.inputBorder,
          },
        ]}
      >
        <Search
          size={18}
          color={theme.colors.textLight}
          strokeWidth={2}
        />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.inputPlaceholder}
          selectionColor={theme.colors.primary}
          style={[
            styles.input,
            {
              color: theme.colors.inputText,
              fontFamily: theme.fonts.regular,
            },
          ]}
        />
      </View>

      {showFilter && (
        <TouchableOpacity
          onPress={onFilterPress}
          activeOpacity={0.7}
          style={[
            styles.filterButton,
            {
              backgroundColor: theme.colors.primary,
            },
          ]}
        >
          <SlidersHorizontal
            size={18}
            color={theme.colors.textOnPrimary}
            strokeWidth={2}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    height: 48,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    height: "100%",
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SearchBar;
