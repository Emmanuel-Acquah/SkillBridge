import React, { useRef, useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, ScrollView,
  TouchableOpacity, Dimensions, Image, Animated
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Video, ResizeMode } from 'expo-av';

const PURPLE = '#6B5CE7';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

const categories = ['All', 'CV Writing', 'UI/UX Design', 'Motion Graphics', 'Coding'];

export default function ReelsScreen() {
  const videoRef = useRef<Video>(null);

  // Playback state
  const [isPlaying, setIsPlaying] = useState(true);
  const [showPlayIcon, setShowPlayIcon] = useState(false);

  // Like / bookmark / share state
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(2400);
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(142);

  // Heart burst animation on double tap
  const heartScale = useRef(new Animated.Value(0)).current;
  const heartOpacity = useRef(new Animated.Value(0)).current;

  // Play icon flash animation on single tap
  const playIconOpacity = useRef(new Animated.Value(0)).current;

  // Double-tap detection
  const lastTap = useRef<number>(0);

  // ── Toggle play/pause ──────────────────────────────────────────────────────
  const togglePlay = useCallback(async () => {
    if (isPlaying) {
      await videoRef.current?.pauseAsync();
    } else {
      await videoRef.current?.playAsync();
    }
    setIsPlaying(prev => !prev);

    // Flash a play/pause icon briefly
    Animated.sequence([
      Animated.timing(playIconOpacity, { toValue: 1, duration: 120, useNativeDriver: true }),
      Animated.delay(600),
      Animated.timing(playIconOpacity, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start();
  }, [isPlaying]);

  // ── Trigger heart burst animation ──────────────────────────────────────────
  const triggerHeartBurst = useCallback(() => {
    heartScale.setValue(0);
    heartOpacity.setValue(1);
    Animated.parallel([
      Animated.spring(heartScale, { toValue: 1.4, useNativeDriver: true, friction: 4 }),
      Animated.sequence([
        Animated.delay(400),
        Animated.timing(heartOpacity, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  // ── Like logic ─────────────────────────────────────────────────────────────
  const handleLike = useCallback(() => {
    setLiked(prev => {
      const nowLiked = !prev;
      setLikeCount(c => nowLiked ? c + 1 : c - 1);
      if (nowLiked) triggerHeartBurst();
      return nowLiked;
    });
  }, [triggerHeartBurst]);

  // ── Handle video tap: single = play/pause, double = like ──────────────────
  const handleVideoTap = useCallback(() => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    if (now - lastTap.current < DOUBLE_TAP_DELAY) {
      // Double tap — like!
      if (!liked) handleLike();
      else triggerHeartBurst();
      lastTap.current = 0;
    } else {
      lastTap.current = now;
      // Delay single tap to wait for potential double tap
      setTimeout(() => {
        if (Date.now() - lastTap.current >= DOUBLE_TAP_DELAY) {
          togglePlay();
        }
      }, DOUBLE_TAP_DELAY);
    }
  }, [liked, handleLike, togglePlay, triggerHeartBurst]);

  // ── Bookmark toggle ────────────────────────────────────────────────────────
  const handleBookmark = useCallback(() => {
    setBookmarked(prev => {
      setBookmarkCount(c => !prev ? c + 1 : c - 1);
      return !prev;
    });
  }, []);

  const formatCount = (n: number) =>
    n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`;

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>SkillBridge</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => router.push('/(screens)/Notification')}>
            <Ionicons name="notifications-outline" size={24} color="#1A1A2E" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={() => router.push('/(tabs)/Messages')}>
            <Ionicons name="chatbubble-ellipses-outline" size={23} color="#1A1A2E" />
          </TouchableOpacity>
          <Image source={{ uri: 'https://i.pravatar.cc/100?img=11' }} style={styles.avatarImg} />
        </View>
      </View>

      <View style={styles.container}>
        {/* ── Full-screen tappable video ── */}
        <TouchableOpacity style={styles.videoContainer} activeOpacity={1} onPress={handleVideoTap}>
          <Video
            ref={videoRef}
            style={styles.video}
            source={require('../../assets/images/reels.mp4')}
            useNativeControls={false}
            resizeMode={ResizeMode.COVER}
            isLooping
            shouldPlay
          />
          {/* Overlay */}
          <View style={styles.overlay} />

          {/* Centered play/pause flash icon */}
          <Animated.View style={[styles.centerIcon, { opacity: playIconOpacity }]}>
            <Ionicons
              name={isPlaying ? 'pause' : 'play'}
              size={52}
              color="rgba(255,255,255,0.9)"
            />
          </Animated.View>

          {/* Double-tap heart burst */}
          <Animated.View
            pointerEvents="none"
            style={[
              styles.heartBurst,
              {
                transform: [{ scale: heartScale }],
                opacity: heartOpacity,
              },
            ]}
          >
            <Ionicons name="heart" size={90} color="#FF3B70" />
          </Animated.View>
        </TouchableOpacity>

        {/* ── Floating Category Pills ── */}
        <View style={styles.categoriesRow}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
            {categories.map((cat, index) => {
              const isActive = cat === 'UI/UX Design';
              return (
                <TouchableOpacity key={index} style={[styles.categoryPill, isActive && styles.categoryPillActive]}>
                  <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>{cat}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* ── Right Action Buttons ── */}
        <View style={styles.rightActions}>
          {/* Like */}
          <TouchableOpacity style={styles.actionBtn} onPress={handleLike}>
            <View style={[styles.actionIconBg, liked && styles.actionIconBgActive]}>
              <Ionicons name={liked ? 'heart' : 'heart-outline'} size={24} color={liked ? '#FF3B70' : '#FFF'} />
            </View>
            <Text style={styles.actionText}>{formatCount(likeCount)}</Text>
          </TouchableOpacity>

          {/* Bookmark */}
          <TouchableOpacity style={styles.actionBtn} onPress={handleBookmark}>
            <View style={[styles.actionIconBg, bookmarked && styles.actionIconBgActive]}>
              <Ionicons name={bookmarked ? 'bookmark' : 'bookmark-outline'} size={22} color={bookmarked ? '#FDE047' : '#FFF'} />
            </View>
            <Text style={styles.actionText}>{formatCount(bookmarkCount)}</Text>
          </TouchableOpacity>

          {/* Share */}
          <TouchableOpacity style={styles.actionBtn} onPress={() => router.push('/(tabs)/Messages')}>
            <View style={styles.actionIconBg}>
              <Ionicons name="share-social-outline" size={22} color="#FFF" />
            </View>
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
        </View>

        {/* ── Bottom Creator Info ── */}
        <View style={styles.bottomInfo}>
          <View style={styles.authorRow}>
            <Image source={{ uri: 'https://i.pravatar.cc/100?img=9' }} style={styles.authorAvatar} />
            <Text style={styles.authorName}>Ama Mensah</Text>
            <Ionicons name="checkmark-circle" size={16} color="#3B82F6" style={{ marginLeft: 4 }} />
          </View>

          <View style={styles.badgesRow}>
            <View style={styles.topRatedBadge}>
              <Text style={styles.topRatedText}>TOP RATED</Text>
            </View>
            <View style={styles.ratingBadge}>
              <Text style={styles.starIcon}>★</Text>
              <Text style={styles.ratingText}>4.9</Text>
            </View>
          </View>

          <Text style={styles.description}>
            Designing seamless experiences for visionary tech startups. Let's build something iconic together.{' '}
            <Text style={styles.hashtag}>#productdesign #ux</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
  },
  logo: { fontSize: 20, fontWeight: '800', color: PURPLE, letterSpacing: -0.5 },
  headerIcons: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconBtn: { padding: 2 },
  avatarImg: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 4,
  },
  container: { flex: 1, backgroundColor: '#000', position: 'relative' },
  videoContainer: { flex: 1 },
  video: { width: '100%', height: '100%' },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  centerIcon: {
    position: 'absolute',
    alignSelf: 'center',
    top: '42%',
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 40,
    padding: 12,
  },
  heartBurst: {
    position: 'absolute',
    alignSelf: 'center',
    top: '35%',
  },
  categoriesRow: { position: 'absolute', top: 16, width: '100%' },
  categoriesScroll: { paddingHorizontal: 16, gap: 10 },
  categoryPill: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  categoryPillActive: { backgroundColor: PURPLE, borderColor: PURPLE },
  categoryText: { color: '#FFF', fontSize: 13, fontWeight: '500' },
  categoryTextActive: { color: '#FFF', fontWeight: '700' },
  rightActions: {
    position: 'absolute',
    right: 16,
    bottom: 120,
    alignItems: 'center',
    gap: 20,
  },
  actionBtn: { alignItems: 'center', gap: 6 },
  actionIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIconBgActive: {
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  actionText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  bottomInfo: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 80,
  },
  authorRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  authorAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
    borderWidth: 1.5,
    borderColor: '#FFF',
  },
  authorName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFF',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  badgesRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  topRatedBadge: {
    backgroundColor: '#059669',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  topRatedText: { color: '#FFF', fontSize: 9, fontWeight: '800', letterSpacing: 0.5 },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  starIcon: { color: '#F59E0B', fontSize: 12 },
  ratingText: {
    color: '#FFF', fontSize: 12, fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  description: {
    color: '#FFF', fontSize: 13, lineHeight: 20,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  hashtag: { fontWeight: '700', color: '#FFF' },
});