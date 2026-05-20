import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

// 1. Define what "props" (properties) this component can accept
interface NavBarProps {
  title: string;
  showBackButton?: boolean;
}

// 2. Create the Component
export default function NavBar({ title, showBackButton = false }: NavBarProps) {
  return (
    <View style={styles.container}>
      {/* Left side: Back Button (Only shows if showBackButton is true) */}
      <View style={styles.leftSide}>
        {showBackButton && (
          <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
            <Ionicons name="arrow-back" size={24} color="#1A1A2E" />
          </TouchableOpacity>
        )}
      </View>

      {/* Center: Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Right side: Example action icon */}
      <View style={styles.rightSide}>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="ellipsis-horizontal" size={24} color="#1A1A2E" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// 3. Style the Component
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  leftSide: {
    width: 40, // Fixed width ensures the title stays perfectly centered
    alignItems: 'flex-start',
  },
  rightSide: {
    width: 40, // Fixed width ensures the title stays perfectly centered
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A2E',
    flex: 1,
    textAlign: 'center',
  },
  iconBtn: {
    padding: 4,
  },
});
