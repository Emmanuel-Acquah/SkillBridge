import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform, StatusBar as RNStatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { C } from '../../constants/Theme';

export default function StandardHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.logo}>SkillBridge</Text>
      <View style={styles.headerIcons}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => router.push('/(screens)/Notification')}>
          <Ionicons name="notifications-outline" size={24} color={C.dark} />
          <View style={styles.notifDot} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn} onPress={() => router.push('/(tabs)/Messages')}>
          <Ionicons name="chatbubble-ellipses-outline" size={23} color={C.dark} />
        </TouchableOpacity>
        <View style={styles.userAvatar}>
          <Image source={{uri: 'https://i.pravatar.cc/100?img=11'}} style={styles.avatarImg} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: C.white,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  logo: {
    fontSize: 22,
    fontWeight: '800',
    color: C.purple,
    letterSpacing: -0.5,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBtn: {
    position: 'relative',
    padding: 2,
  },
  notifDot: {
    position: 'absolute',
    top: 2,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: C.red,
    borderWidth: 1.5,
    borderColor: C.white,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: C.purple,
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  }
});
