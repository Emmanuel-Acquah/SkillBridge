import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ImageBackground, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

const PURPLE = '#6B5CE7';
const TEXT_DARK = '#1A1A2E';
const TEXT_GREY = '#9B9BB0';

const exploreItems = [
  {
    id: '1',
    image: require('../../assets/images/UIdesign.jpg'),
    author: 'Sarah Jenkins',
    title: 'Expert UI/UX Design for Fintech & SaaS Products',
    price: '$850',
    rating: '4.9',
    avatarColor: '#E0E7FF',
    initials: 'SJ'
  },
  {
    id: '2',
    image: require('../../assets/images/forex.jpg'),
    author: 'David Chen',
    title: 'Tax Strategy & Financial Audit for Startups',
    price: '$1,200',
    rating: '5.0',
    avatarColor: '#FEE2E2',
    initials: 'DC'
  },
  {
    id: '3',
    image: require('../../assets/images/corporate.jpg'),
    author: 'Elena Rodriguez',
    title: 'Brand Identity & Visual Storytelling for Fintech',
    price: '$2,400',
    rating: '4.8',
    avatarColor: '#ECFDF5',
    initials: 'ER'
  },
  {
    id: '4',
    image: require('../../assets/images/smartsecurity.jpg'),
    author: 'Marcus Thorne',
    title: 'Smart Contract Security Audit & Web3 Dev',
    price: '$3,500',
    rating: '4.9',
    avatarColor: '#FEF3C7',
    initials: 'MT'
  }
];

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.logo}>SkillBridge</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => router.push('/(screens)/Notification')}>
            <Ionicons name="notifications-outline" size={24} color={TEXT_DARK} />
            <View style={styles.notifDot} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={() => router.push('/(tabs)/Messages')}>
            <Ionicons name="chatbubble-ellipses-outline" size={23} color={TEXT_DARK} />
          </TouchableOpacity>
          <View style={styles.userAvatar}>
            <Text style={styles.avatarText}>A</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Find Expert Talent</Text>

        <TouchableOpacity style={styles.searchBar} activeOpacity={0.8}>
          <Ionicons name="search" size={20} color={TEXT_GREY} />
          <Text style={styles.searchText}>Search for UI design, video editors, or writers...</Text>
        </TouchableOpacity>

        <View style={styles.filterRow}>
          <TouchableOpacity style={[styles.filterPill, styles.filterPillActive]}>
            <Text style={styles.filterTextActive}>Category</Text>
            <Ionicons name="chevron-down" size={14} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterPill}>
            <Text style={styles.filterText}>Price Range</Text>
            <Ionicons name="chevron-down" size={14} color={TEXT_DARK} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterPill}>
            <Text style={styles.filterText}>Rating</Text>
            <Ionicons name="chevron-down" size={14} color={TEXT_DARK} />
          </TouchableOpacity>
        </View>
        <View style={[styles.filterRow, { marginTop: 8 }]}>
          <TouchableOpacity style={styles.filterPill}>
            <Text style={styles.filterText}>Delivery Time</Text>
            <Ionicons name="chevron-down" size={14} color={TEXT_DARK} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.clearText}>Clear all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          {exploreItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.card} activeOpacity={0.9}>
              <ImageBackground source={item.image} style={styles.cardImage} imageStyle={{ borderRadius: 12 }}>
                <View style={styles.ratingBadge}>
                  <Text style={styles.starIcon}>★</Text>
                  <Text style={styles.ratingBadgeText}>{item.rating}</Text>
                </View>
              </ImageBackground>
              <View style={styles.cardBody}>
                <View style={styles.authorRow}>
                  <View style={[styles.authorAvatar, { backgroundColor: item.avatarColor }]}>
                    <Text style={styles.authorInitials}>{item.initials}</Text>
                  </View>
                  <Text style={styles.authorName}>{item.author}</Text>
                </View>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <View style={styles.cardFooter}>
                  <Text style={styles.startingPrice}>STARTING PRICE</Text>
                  <Text style={styles.price}>{item.price}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FDF8FF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FDF8FF',
  },
  logo: {
    fontSize: 20,
    fontWeight: '800',
    color: PURPLE,
    letterSpacing: -0.5,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBtn: {
    padding: 2,
    position: 'relative',
  },
  notifDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 1.5,
    borderColor: '#FDF8FF',
  },
  userAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: PURPLE,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
  avatarText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  scroll: {
    flex: 1,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: TEXT_DARK,
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 24,
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    marginBottom: 20,
  },
  searchText: {
    color: TEXT_GREY,
    fontSize: 13,
    flex: 1,
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBEBF2',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  filterPillActive: {
    backgroundColor: PURPLE,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    color: TEXT_DARK,
  },
  filterTextActive: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFF',
  },
  clearText: {
    fontSize: 12,
    fontWeight: '600',
    color: PURPLE,
    marginLeft: 8,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 40,
    gap: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  cardImage: {
    width: '100%',
    height: 160,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: 10,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  starIcon: {
    color: '#F59E0B',
    fontSize: 12,
  },
  ratingBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: TEXT_DARK,
  },
  cardBody: {
    marginTop: 12,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  authorAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authorInitials: {
    fontSize: 9,
    fontWeight: '700',
    color: TEXT_DARK,
  },
  authorName: {
    fontSize: 12,
    color: TEXT_GREY,
    fontWeight: '500',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: TEXT_DARK,
    marginBottom: 12,
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  startingPrice: {
    fontSize: 9,
    fontWeight: '700',
    color: TEXT_GREY,
    letterSpacing: 0.5,
  },
  price: {
    fontSize: 16,
    fontWeight: '800',
    color: PURPLE,
  },
});