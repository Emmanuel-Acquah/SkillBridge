import React from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";

interface FilterChipsProps {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const FilterChips: React.FC<FilterChipsProps> = ({
  filters,
  activeFilter,
  onFilterChange,
}) => {
  const { theme } = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {filters.map((filter) => {
        const isActive = activeFilter === filter;
        return (
          <TouchableOpacity
            key={filter}
            onPress={() => onFilterChange(filter)}
            activeOpacity={0.7}
            style={[
              styles.chip,
              {
                backgroundColor: isActive
                  ? theme.colors.primary
                  : theme.colors.surfaceSecondary,
                borderColor: isActive
                  ? theme.colors.primary
                  : theme.colors.border,
              },
            ]}
          >
            <Text
              style={[
                styles.chipText,
                {
                  color: isActive
                    ? theme.colors.textOnPrimary
                    : theme.colors.textSecondary,
                  fontFamily: isActive
                    ? theme.fonts.semiBold
                    : theme.fonts.medium,
                },
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 13,
  },
});

export default FilterChips;
