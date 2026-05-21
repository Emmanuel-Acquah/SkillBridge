// app/settings/edit-profile.tsx
// Full edit profile form: avatar picker, name, bio, email, social links.

import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TextInput,
  StyleSheet, SafeAreaView, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { C, shadow } from '../../constants/Theme';

export default function EditProfileScreen() {
  const router = useRouter();

  const [name, setName]         = useState('Alexander Sterling');
  const [username, setUsername] = useState('@alex.sterling');
  const [email, setEmail]       = useState('alex.sterling@skillbridge.io');
  const [phone, setPhone]       = useState('+1 (555) 234-5678');
  const [password, setPassword] = useState('********');
  const [bio, setBio]           = useState('Senior UX Designer & Full-Stack Developer with 8+ years building SaaS products. Passionate about clean design and scalable systems.');
  const [location, setLocation] = useState('San Francisco, CA');
  const [title, setTitle]       = useState('Senior UX Designer');
  const [linkedin, setLinkedin] = useState('linkedin.com/in/alexsterling');
  const [github, setGithub]     = useState('github.com/alexsterling');
  const [twitter, setTwitter]   = useState('@alexsterling');
  const [website, setWebsite]   = useState('alexsterling.design');
  const [saving, setSaving]     = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      Alert.alert('Profile Updated', 'Your changes have been saved successfully.', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    }, 1000);
  };

  return (
    <SafeAreaView style={s.safe}>
      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity style={s.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Text style={s.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSave} activeOpacity={0.8} disabled={saving}>
          <Text style={[s.saveBtn, saving && { opacity: 0.5 }]}>{saving ? 'Saving…' : 'Save'}</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView style={s.scroll} contentContainerStyle={s.content} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

          {/* ── Avatar ── */}
          <View style={s.avatarSection}>
            <View style={s.avatarWrap}>
              <View style={s.avatar}>
                <Text style={s.avatarInitials}>AS</Text>
              </View>
              <TouchableOpacity
                style={s.cameraBtn}
                activeOpacity={0.8}
                onPress={() =>
                  Alert.alert('Change Photo', 'Choose a source', [
                    { text: 'Camera',        onPress: () => console.log('camera') },
                    { text: 'Photo Library', onPress: () => console.log('library') },
                    { text: 'Cancel', style: 'cancel' },
                  ])
                }
              >
                <Text style={{ fontSize: 16 }}>📷</Text>
              </TouchableOpacity>
            </View>
            <Text style={s.avatarHint}>Tap to change photo</Text>
            <Text style={s.avatarHintSub}>JPG or PNG, max 5MB</Text>
          </View>

          {/* ── Basic Info ── */}
          <SectionLabel title="BASIC INFORMATION" />

          <Field label="Full Name" icon="👤" value={name} onChangeText={setName} placeholder="Your full name" />
          <Field label="Username" icon="@" iconText value={username} onChangeText={setUsername} placeholder="@username" />
          <Field label="Professional Title" icon="💼" value={title} onChangeText={setTitle} placeholder="e.g. Senior UX Designer" />
          <Field label="Location" icon="📍" value={location} onChangeText={setLocation} placeholder="City, Country" />

          {/* ── Bio ── */}
          <SectionLabel title="BIO" />
          <View style={s.fieldWrap}>
            <Text style={s.fieldLabel}>About You</Text>
            <View style={[s.inputWrap, s.textAreaWrap]}>
              <TextInput
                style={[s.input, s.textArea]}
                value={bio}
                onChangeText={setBio}
                placeholder="Tell clients about yourself..."
                placeholderTextColor={C.grey}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                maxLength={300}
              />
            </View>
            <Text style={s.charCount}>{bio.length}/300</Text>
          </View>

          {/* ── Contact & Security ── */}
          <SectionLabel title="CONTACT & SECURITY" />
          <Field label="Email Address" icon="✉️" value={email} onChangeText={setEmail} placeholder="your@email.com" keyboardType="email-address" />
          <Field label="Phone Number" icon="📞" value={phone} onChangeText={setPhone} placeholder="+1 (555) 000-0000" keyboardType="phone-pad" />
          <Field label="Password" icon="🔒" value={password} onChangeText={setPassword} placeholder="Enter new password" secureTextEntry />

          {/* ── Social Links ── */}
          <SectionLabel title="SOCIAL & PROFESSIONAL LINKS" />

          <Field
            label="LinkedIn"
            icon="🔵"
            value={linkedin}
            onChangeText={setLinkedin}
            placeholder="linkedin.com/in/yourname"
            keyboardType="url"
            prefix="linkedin.com/in/"
          />
          <Field
            label="GitHub"
            icon="⬛"
            value={github}
            onChangeText={setGithub}
            placeholder="github.com/yourname"
            keyboardType="url"
          />
          <Field
            label="Twitter / X"
            icon="🐦"
            value={twitter}
            onChangeText={setTwitter}
            placeholder="@yourhandle"
          />
          <Field
            label="Personal Website"
            icon="🌐"
            value={website}
            onChangeText={setWebsite}
            placeholder="yoursite.com"
            keyboardType="url"
          />

          {/* ── Save Button ── */}
          <TouchableOpacity
            style={[s.saveLargeBtn, saving && { opacity: 0.7 }]}
            onPress={handleSave}
            activeOpacity={0.85}
            disabled={saving}
          >
            <Text style={s.saveLargeBtnText}>{saving ? 'Saving…' : 'Save Changes'}</Text>
          </TouchableOpacity>

          {/* Discard */}
          <TouchableOpacity style={s.discardBtn} onPress={() => router.back()} activeOpacity={0.7}>
            <Text style={s.discardText}>Discard Changes</Text>
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ── HELPERS ──────────────────────────────────

function SectionLabel({ title }: { title: string }) {
  return <Text style={s.sectionLabel}>{title}</Text>;
}

function Field({
  label, icon, iconText = false, value, onChangeText, placeholder,
  keyboardType = 'default', prefix, secureTextEntry = false,
}: {
  label: string; icon: string; iconText?: boolean;
  value: string; onChangeText: (v: string) => void;
  placeholder: string; keyboardType?: any; prefix?: string;
  secureTextEntry?: boolean;
}) {
  return (
    <View style={s.fieldWrap}>
      <Text style={s.fieldLabel}>{label}</Text>
      <View style={s.inputWrap}>
        {iconText
          ? <Text style={s.iconText}>{icon}</Text>
          : <Text style={s.iconEmoji}>{icon}</Text>
        }
        {prefix && <Text style={s.prefix}>{prefix}</Text>}
        <TextInput
          style={s.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={C.grey}
          keyboardType={keyboardType}
          autoCapitalize="none"
          secureTextEntry={secureTextEntry}
        />
      </View>
    </View>
  );
}

// ── STYLES ───────────────────────────────────

const s = StyleSheet.create({
  safe:    { flex: 1, backgroundColor: C.white },
  scroll:  { flex: 1, backgroundColor: C.bg },
  content: { paddingBottom: 24 },

  header:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14, backgroundColor: C.white, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: C.border },
  backBtn:     { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  backIcon:    { fontSize: 22, color: C.dark },
  headerTitle: { fontSize: 18, fontWeight: '700', color: C.dark },
  saveBtn:     { fontSize: 15, fontWeight: '700', color: C.purple },

  avatarSection: { alignItems: 'center', paddingVertical: 28, backgroundColor: C.white, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: C.border },
  avatarWrap:    { position: 'relative', marginBottom: 10 },
  avatar:        { width: 96, height: 96, borderRadius: 48, backgroundColor: C.purple, alignItems: 'center', justifyContent: 'center', ...shadow.md },
  avatarInitials:{ fontSize: 32, fontWeight: '700', color: C.white },
  cameraBtn:     { position: 'absolute', bottom: 0, right: 0, width: 32, height: 32, borderRadius: 16, backgroundColor: C.white, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: C.border, ...shadow.sm },
  avatarHint:    { fontSize: 14, fontWeight: '600', color: C.purple },
  avatarHintSub: { fontSize: 11, color: C.grey, marginTop: 2 },

  sectionLabel: { fontSize: 11, fontWeight: '700', color: C.grey, letterSpacing: 1, paddingHorizontal: 16, marginTop: 20, marginBottom: 10 },

  fieldWrap:   { marginHorizontal: 16, marginBottom: 12 },
  fieldLabel:  { fontSize: 12, fontWeight: '600', color: C.med, marginBottom: 6 },
  inputWrap:   { flexDirection: 'row', alignItems: 'center', backgroundColor: C.white, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 12, gap: 8, borderWidth: 1.5, borderColor: C.border },
  iconEmoji:   { fontSize: 16 },
  iconText:    { fontSize: 15, fontWeight: '700', color: C.grey },
  prefix:      { fontSize: 13, color: C.grey },
  input:       { flex: 1, fontSize: 14, color: C.dark },
  textAreaWrap:{ alignItems: 'flex-start', paddingVertical: 10 },
  textArea:    { height: 100, lineHeight: 20 },
  charCount:   { fontSize: 11, color: C.grey, textAlign: 'right', marginTop: 4 },

  saveLargeBtn:     { marginHorizontal: 16, marginTop: 24, backgroundColor: C.purple, borderRadius: 14, paddingVertical: 16, alignItems: 'center', ...shadow.sm },
  saveLargeBtnText: { color: C.white, fontSize: 16, fontWeight: '700' },
  discardBtn:       { marginTop: 10, alignItems: 'center', paddingVertical: 12 },
  discardText:      { fontSize: 14, color: C.grey, fontWeight: '500' },
});