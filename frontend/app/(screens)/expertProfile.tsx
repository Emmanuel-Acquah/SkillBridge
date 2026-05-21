import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

type SkillProfile = {
  talent: string;
  name: string;
  verifiedLabel: string;
  title: string;
  description: string;
  cover: any;
  avatar: string;
  rating: string;
  completedProjects: string;
  responseTime: string;
  skills: string[];
  projects: Array<{ title: string; subtitle: string; image: any }>;
  packages: Array<{ tier: string; price: string; accent: string; features: string[] }>;
  testimonials: Array<{ name: string; role: string; quote: string }>;
};

const PROFILES: Record<string, SkillProfile> = {
  uiux: {
    talent: 'uiux',
    name: 'Alex Sterling',
    verifiedLabel: 'Verified Pro',
    title: 'Senior Product & Interaction Designer',
    description:
      'Crafting sharp, conversion-focused product experiences for fintech and high-growth startups with modern systems and clear design thinking.',
    cover: require('../../assets/images/UIdesign.jpg'),
    avatar: 'https://i.pravatar.cc/200?img=12',
    rating: '4.9/5.0',
    completedProjects: '85+',
    responseTime: '2 Hours',
    skills: ['Product Design', 'Figma Mastery', 'Fintech UI/UX', 'Design Systems', 'Proto Visualization', 'Brand Strategy'],
    projects: [
      { title: 'Vanguard FinTech Dashboard', subtitle: 'Complete UX overhaul for a Tier 1 investment portal.', image: require('../../assets/images/forex.jpg') },
      { title: 'Lumina Crypto Wallet', subtitle: 'Mobile-first security-led interface for clarity and trust.', image: require('../../assets/images/corporate.jpg') },
      { title: 'Nexus Design System', subtitle: 'Scaled component library for enterprise teams.', image: require('../../assets/images/UIdesign.jpg') },
    ],
    packages: [
      { tier: 'Basic', price: '$850', accent: '#7A56FF', features: ['Landing Page Design', 'Responsive Layouts', '2 Rounds of Revisions', 'Source Files'] },
      { tier: 'Standard', price: '$2,400', accent: '#6B21A8', features: ['Up to 5 Web Screens', 'Custom Design System', 'Prototyping & Motion', '5 Rounds of Revisions'] },
      { tier: 'Premium', price: '$5,500', accent: '#5112B5', features: ['Full Web & Mobile Suite', 'Investor Deck Design', 'Unlimited Revisions', 'Post-launch Support'] },
    ],
    testimonials: [
      { name: 'Sarah Chen', role: 'CTO at Northstar', quote: 'Alex translated our messy requirements into a remarkable interface that our team could ship quickly.' },
      { name: 'James Wilson', role: 'Founder at Nova Labs', quote: 'Communication was clear, delivery was fast, and the final design exceeded expectations.' },
    ],
  },
  finance: {
    talent: 'finance',
    name: 'David Chen',
    verifiedLabel: 'Verified Pro',
    title: 'Financial Strategy & Audit Specialist',
    description:
      'Helping startups and scaleups with cash-flow planning, bookkeeping cleanup, tax strategy, and investor-ready financial reporting.',
    cover: require('../../assets/images/forex.jpg'),
    avatar: 'https://i.pravatar.cc/200?img=13',
    rating: '5.0/5.0',
    completedProjects: '120+',
    responseTime: '4 Hours',
    skills: ['Bookkeeping', 'Tax Strategy', 'Audit Preparation', 'Forecasting', 'Budget Planning', 'Investor Reporting'],
    projects: [
      { title: 'FinFlow Revenue Dashboard', subtitle: 'Built a reporting view for recurring revenue and churn.', image: require('../../assets/images/forex.jpg') },
      { title: 'Seed Round Finance Pack', subtitle: 'Prepared clean decks and model sheets for investors.', image: require('../../assets/images/corporate.jpg') },
      { title: 'Tax Cleanup Sprint', subtitle: 'Resolved backlog issues and organized filing data.', image: require('../../assets/images/UIdesign.jpg') },
    ],
    packages: [
      { tier: 'Basic', price: '$650', accent: '#7A56FF', features: ['1 Cleanup Session', 'Bookkeeping Review', 'Budget Snapshot', '1 Revision Round'] },
      { tier: 'Standard', price: '$1,900', accent: '#6B21A8', features: ['Monthly Audit', 'Tax Strategy Review', 'Forecast Model', '4 Revision Rounds'] },
      { tier: 'Premium', price: '$4,800', accent: '#5112B5', features: ['Investor-ready Books', 'Monthly Advisory', 'Priority Support', 'Unlimited Revisions'] },
    ],
    testimonials: [
      { name: 'Alicia Brown', role: 'Founder at Luma', quote: 'David helped us clean up months of records and made our numbers understandable again.' },
      { name: 'Noah Patel', role: 'COO at Orbit', quote: 'The level of detail and speed was exactly what we needed before our audit.' },
    ],
  },
  branding: {
    talent: 'branding',
    name: 'Elena Rodriguez',
    verifiedLabel: 'Verified Pro',
    title: 'Brand Identity & Visual Storytelling',
    description:
      'Designing memorable brands for fintech, SaaS, and product-led companies with clean systems and a premium visual language.',
    cover: require('../../assets/images/corporate.jpg'),
    avatar: 'https://i.pravatar.cc/200?img=9',
    rating: '4.8/5.0',
    completedProjects: '72+',
    responseTime: '3 Hours',
    skills: ['Brand Direction', 'Identity Systems', 'Pitch Decks', 'Visual Storytelling', 'Iconography', 'Style Guides'],
    projects: [
      { title: 'Orion Brand Refresh', subtitle: 'Repositioned the product with a cleaner visual narrative.', image: require('../../assets/images/corporate.jpg') },
      { title: 'Launch Deck System', subtitle: 'Created a premium investor-friendly slide library.', image: require('../../assets/images/UIdesign.jpg') },
      { title: 'Identity Toolkit', subtitle: 'Delivered a scalable logo, color, and type system.', image: require('../../assets/images/forex.jpg') },
    ],
    packages: [
      { tier: 'Basic', price: '$900', accent: '#7A56FF', features: ['Moodboard', 'Logo Direction', 'Color Palette', '1 Revision'] },
      { tier: 'Standard', price: '$2,300', accent: '#6B21A8', features: ['Brand Guidelines', 'Deck Templates', 'Icon Set', '3 Revisions'] },
      { tier: 'Premium', price: '$5,000', accent: '#5112B5', features: ['Full Brand System', 'Pitch Deck', 'Launch Assets', 'Unlimited Revisions'] },
    ],
    testimonials: [
      { name: 'Maya Singh', role: 'CEO at Layer', quote: 'Elena gave our brand a premium feel without losing clarity or speed.' },
      { name: 'Brian Lee', role: 'Product Lead at Vale', quote: 'The visual story she built helped us close our launch campaign much faster.' },
    ],
  },
  web3: {
    talent: 'web3',
    name: 'Marcus Thorne',
    verifiedLabel: 'Verified Pro',
    title: 'Smart Contract Security Engineer',
    description:
      'Auditing smart contracts, threat modeling, and shipping secure blockchain systems with a focus on practical, actionable fixes.',
    cover: require('../../assets/images/smartsecurity.jpg'),
    avatar: 'https://i.pravatar.cc/200?img=15',
    rating: '4.9/5.0',
    completedProjects: '48+',
    responseTime: '2 Hours',
    skills: ['Security Audits', 'Threat Modeling', 'Web3 Dev', 'Code Review', 'DeFi Analysis', 'Monitoring Systems'],
    projects: [
      { title: 'Vanguard Smart Audit', subtitle: 'Reviewed core contracts and patched critical vulnerabilities.', image: require('../../assets/images/smartsecurity.jpg') },
      { title: 'DeFi Risk Monitor', subtitle: 'Built alerting and reporting for high-risk protocol changes.', image: require('../../assets/images/forex.jpg') },
      { title: 'Ledger Ops Review', subtitle: 'Assessed production systems for release readiness.', image: require('../../assets/images/corporate.jpg') },
    ],
    packages: [
      { tier: 'Basic', price: '$1,200', accent: '#7A56FF', features: ['Code Scan', 'Risk Summary', 'Patch Notes', '1 Revision'] },
      { tier: 'Standard', price: '$3,200', accent: '#6B21A8', features: ['Full Audit', 'Exploit Review', 'Action Plan', '3 Revisions'] },
      { tier: 'Premium', price: '$6,500', accent: '#5112B5', features: ['Deep Audit', 'Post-launch Monitoring', 'Priority Support', 'Unlimited Revisions'] },
    ],
    testimonials: [
      { name: 'Tara Gomez', role: 'Founder at ChainIQ', quote: 'Marcus found issues we did not see and gave us clear steps to fix them.' },
      { name: 'Owen Reed', role: 'CTO at Blockhouse', quote: 'The final audit was concise, practical, and very easy to action.' },
    ],
  },
};

function getProfile(talent?: string) {
  return PROFILES[talent ?? 'uiux'] ?? PROFILES.uiux;
}

function Stars({ rating }: { rating: string }) {
  const full = Math.round(Number.parseFloat(rating) || 5);

  return (
    <View style={styles.starRow}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Ionicons
          key={index}
          name={index < full ? 'star' : 'star-outline'}
          size={14}
          color={index < full ? '#F59E0B' : '#C7CAD9'}
        />
      ))}
    </View>
  );
}

export default function ExpertProfileScreen() {
  const router = useRouter();
  const { talent } = useLocalSearchParams<{ talent?: string }>();
  const profile = getProfile(typeof talent === 'string' ? talent : undefined);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={20} color="#1A1A2E" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Expert Profile</Text>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="share-social-outline" size={18} color="#1A1A2E" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileCard}>
          <ImageBackground source={profile.cover} style={styles.profileCover} imageStyle={styles.coverImage}>
            <View style={styles.avatarWrap}>
              <Image source={{ uri: profile.avatar }} style={styles.avatar} />
              <View style={styles.onlineDot} />
            </View>
          </ImageBackground>

          <View style={styles.identityBlock}>
            <Text style={styles.name}>{profile.name}</Text>
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={12} color="#10B981" />
              <Text style={styles.verifiedText}>{profile.verifiedLabel}</Text>
            </View>
            <Text style={styles.title}>{profile.title}</Text>
            <Text style={styles.description}>{profile.description}</Text>

            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.connectButton} onPress={() => router.push(`/(screens)/body1?talent=${profile.talent}&expert=${encodeURIComponent(profile.name)}`)}>
                <Text style={styles.connectButtonText}>Connect</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.resumeButton}>
                <Text style={styles.resumeButtonText}>Download Resume</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Ionicons name="star-outline" size={16} color="#7A56FF" />
            <Text style={styles.statValue}>{profile.rating}</Text>
            <Text style={styles.statLabel}>Average rating from clients</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="people-outline" size={16} color="#7A56FF" />
            <Text style={styles.statValue}>{profile.completedProjects}</Text>
            <Text style={styles.statLabel}>Completed projects</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="time-outline" size={16} color="#7A56FF" />
            <Text style={styles.statValue}>{profile.responseTime}</Text>
            <Text style={styles.statLabel}>Average response time</Text>
          </View>
        </View>

        <View style={styles.skillsCard}>
          <Text style={styles.sectionTitle}>Specialized Skills</Text>
          <View style={styles.skillsGrid}>
            {profile.skills.map((skill) => (
              <View key={skill} style={styles.skillChip}>
                <Text style={styles.skillChipText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.sectionHeaderBetween}>
          <Text style={styles.sectionTitle}>Featured Projects</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.projectsList}>
          {profile.projects.map((project) => (
            <View key={project.title} style={styles.projectCard}>
              <ImageBackground source={project.image} style={styles.projectImage} imageStyle={styles.projectImageInner}>
                <View style={styles.projectOverlay} />
              </ImageBackground>
              <View style={styles.projectBody}>
                <Text style={styles.projectTitle}>{project.title}</Text>
                <Text style={styles.projectSubtitle}>{project.subtitle}</Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Service Packages</Text>
        <View style={styles.packageList}>
          {profile.packages.map((pkg, index) => {
            const isPrimary = index === 1;
            return (
              <View key={pkg.tier} style={[styles.packageCard, isPrimary && styles.packageCardPrimary]}>
                <View style={styles.packageTopRow}>
                  <Text style={styles.packageTag}>{index === 0 ? 'For Small Teams' : index === 1 ? 'Most Popular' : 'Enterprise'}</Text>
                  <Text style={styles.packageTier}>{pkg.tier}</Text>
                </View>
                <Text style={[styles.packagePrice, { color: pkg.accent }]}>{pkg.price}</Text>
                <View style={styles.packageFeatureList}>
                  {pkg.features.map((feature) => (
                    <View key={feature} style={styles.packageFeatureRow}>
                      <Ionicons name="checkmark-circle" size={12} color="#10B981" />
                      <Text style={styles.packageFeatureText}>{feature}</Text>
                    </View>
                  ))}
                </View>
                <TouchableOpacity style={[styles.packageButton, isPrimary && styles.packageButtonPrimary]}>
                  <Text style={[styles.packageButtonText, isPrimary && styles.packageButtonTextPrimary]}>Select Package</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Client Testimonials</Text>
        <View style={styles.testimonialList}>
          {profile.testimonials.map((item) => (
            <View key={item.name} style={styles.testimonialCard}>
              <View style={styles.testimonialTopRow}>
                <View style={styles.testimonialPerson}>
                  <View style={styles.testimonialAvatar}>
                    <Text style={styles.testimonialInitial}>{item.name.charAt(0)}</Text>
                  </View>
                  <View>
                    <Text style={styles.testimonialName}>{item.name}</Text>
                    <Text style={styles.testimonialRole}>{item.role}</Text>
                  </View>
                </View>
                <Stars rating={profile.rating} />
              </View>
              <Text style={styles.testimonialQuote}>{item.quote}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F6F2FF' },
  content: { paddingHorizontal: 16, paddingBottom: 28 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
    paddingBottom: 10,
  },
  iconBtn: { width: 34, height: 34, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#1A1A2E' },

  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E8DAFF',
    shadowColor: '#6B21A8',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  profileCover: {
    height: 150,
    borderRadius: 18,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#F3EEFF',
  },
  coverImage: { borderRadius: 18 },
  avatarWrap: {
    marginBottom: -32,
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  avatar: { width: 72, height: 72, borderRadius: 36 },
  onlineDot: {
    position: 'absolute',
    right: 6,
    bottom: 6,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  identityBlock: { marginTop: 42, alignItems: 'center' },
  name: { fontSize: 15, fontWeight: '800', color: '#232145' },
  verifiedBadge: { marginTop: 6, flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#EFFAF4', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  verifiedText: { color: '#10B981', fontSize: 10, fontWeight: '700' },
  title: { marginTop: 12, fontSize: 22, lineHeight: 28, fontWeight: '900', color: '#5112B5', textAlign: 'center' },
  description: { marginTop: 10, fontSize: 12, lineHeight: 18, color: '#56556C', textAlign: 'center' },
  actionRow: { marginTop: 16, width: '100%', gap: 10 },
  connectButton: { backgroundColor: '#5112B5', borderRadius: 14, paddingVertical: 14, alignItems: 'center' },
  connectButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  resumeButton: { borderRadius: 14, paddingVertical: 13, alignItems: 'center', borderWidth: 1.2, borderColor: '#D8C6FF', backgroundColor: '#FBF8FF' },
  resumeButtonText: { color: '#5112B5', fontSize: 13, fontWeight: '800' },

  statsRow: { marginTop: 14, gap: 10 },
  statCard: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 14, borderWidth: 1, borderColor: '#E9E1FF' },
  statValue: { marginTop: 8, fontSize: 20, fontWeight: '900', color: '#1E1B34' },
  statLabel: { marginTop: 4, fontSize: 11, lineHeight: 16, color: '#6C6A84' },

  skillsCard: { marginTop: 14, backgroundColor: '#FFFFFF', borderRadius: 22, padding: 16, borderWidth: 1, borderColor: '#E9E1FF' },
  sectionTitle: { fontSize: 16, fontWeight: '900', color: '#1E1B34' },
  sectionHeaderBetween: { marginTop: 16, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  viewAllText: { color: '#5112B5', fontSize: 12, fontWeight: '800' },
  skillsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 12 },
  skillChip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999, borderWidth: 1, borderColor: '#E1D7FF', backgroundColor: '#FCFAFF' },
  skillChipText: { fontSize: 11, color: '#5E4C8E', fontWeight: '700' },

  projectsList: { gap: 14 },
  projectCard: { backgroundColor: '#FFFFFF', borderRadius: 18, overflow: 'hidden', borderWidth: 1, borderColor: '#E9E1FF' },
  projectImage: { height: 160, backgroundColor: '#F3EEFF' },
  projectImageInner: { borderRadius: 0 },
  projectOverlay: { flex: 1, backgroundColor: 'rgba(81,18,181,0.06)' },
  projectBody: { padding: 14 },
  projectTitle: { fontSize: 14, fontWeight: '800', color: '#1E1B34', marginBottom: 4 },
  projectSubtitle: { fontSize: 11, lineHeight: 16, color: '#6C6A84' },

  packageList: { gap: 12 },
  packageCard: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 16, borderWidth: 1, borderColor: '#E9E1FF' },
  packageCardPrimary: { borderColor: '#5112B5', shadowColor: '#5112B5', shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 3 },
  packageTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  packageTag: { fontSize: 10, fontWeight: '800', color: '#7E6B9B', textTransform: 'uppercase' },
  packageTier: { fontSize: 16, fontWeight: '900', color: '#1E1B34' },
  packagePrice: { marginTop: 8, fontSize: 28, fontWeight: '900' },
  packageFeatureList: { marginTop: 14, gap: 8 },
  packageFeatureRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  packageFeatureText: { fontSize: 12, color: '#4F4C67', fontWeight: '600' },
  packageButton: { marginTop: 16, borderRadius: 14, paddingVertical: 13, alignItems: 'center', borderWidth: 1.2, borderColor: '#D8C6FF', backgroundColor: '#FBF8FF' },
  packageButtonPrimary: { backgroundColor: '#5112B5', borderColor: '#5112B5' },
  packageButtonText: { color: '#5112B5', fontSize: 13, fontWeight: '800' },
  packageButtonTextPrimary: { color: '#FFFFFF' },

  testimonialList: { gap: 12, marginBottom: 18 },
  testimonialCard: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 14, borderWidth: 1, borderColor: '#E9E1FF' },
  testimonialTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 },
  testimonialPerson: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  testimonialAvatar: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#F3EEFF', alignItems: 'center', justifyContent: 'center' },
  testimonialInitial: { color: '#5112B5', fontWeight: '900' },
  testimonialName: { fontSize: 12, fontWeight: '800', color: '#1E1B34' },
  testimonialRole: { fontSize: 10, color: '#6C6A84', marginTop: 2 },
  starRow: { flexDirection: 'row', gap: 2 },
  testimonialQuote: { marginTop: 12, fontSize: 12, lineHeight: 18, color: '#4E4B68' },
});
