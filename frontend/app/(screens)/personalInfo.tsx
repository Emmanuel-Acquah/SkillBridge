// app/settings/personal-info.tsx
// Account → Personal Info: read/edit name, email, professional details.

import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TextInput,
  StyleSheet, SafeAreaView, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { C, shadow } from '../../constants/Theme';

export default function PersonalInfoScreen() {
  const router = useRouter();

  const [firstName, setFirstName] = useState('Alex');
  const [lastName, setLastName]   = useState('Thompson');
  const [email, setEmail]         = useState('alex.t@skillbridge.io');
  const [phone, setPhone]         = useState('+1 (555) 234-5678');
  const [dob, setDob]             = useState('March 15, 1990');
  const [gender, setGender]       = useState('Male');
  const [country, setCountry]     = useState('United States');
  const [city, setCity]           = useState('San Francisco');
  const [profession, setProfession] = useState('UX Designer');
  const [company, setCompany]     = useState('SkillBridge Inc.');
  const [saving, setSaving]       = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      Alert.alert('Saved', 'Personal info updated successfully.', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    }, 900);
  };

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <TouchableOpacity style={s.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Text style={s.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>Personal Info</Text>
        <TouchableOpacity onPress={handleSave} disabled={saving} activeOpacity={0.8}>
          <Text style={[s.saveBtn, saving && { opacity: 0.5 }]}>{saving ? 'Saving…' : 'Save'}</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView style={s.scroll} contentContainerStyle={s.content} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

          <SectionLabel title="NAME" />
          <Field label="First Name" value={firstName} onChangeText={setFirstName} icon="👤" />
          <Field label="Last Name"  value={lastName}  onChangeText={setLastName}  icon="👤" />

          <SectionLabel title="CONTACT" />
          <Field label="Email Address" value={email} onChangeText={setEmail} icon="✉️" keyboardType="email-address" />
          <Field label="Phone Number"  value={phone} onChangeText={setPhone} icon="📞" keyboardType="phone-pad" />

          <SectionLabel title="PERSONAL DETAILS" />
          <Field label="Date of Birth" value={dob}    onChangeText={setDob}    icon="🎂" />
          <Field label="Gender"        value={gender} onChangeText={setGender} icon="👥" />
          <Field label="Country"       value={country} onChangeText={setCountry} icon="🌍" />
          <Field label="City"          value={city}   onChangeText={setCity}   icon="🏙" />

          <SectionLabel title="PROFESSIONAL" />
          <Field label="Profession / Role" value={profession} onChangeText={setProfession} icon="💼" />
          <Field label="Company / Org"     value={company}    onChangeText={setCompany}    icon="🏢" />

          <TouchableOpacity style={[s.saveBtn2, saving && { opacity: 0.7 }]} onPress={handleSave} activeOpacity={0.85} disabled={saving}>
            <Text style={s.saveBtn2Text}>{saving ? 'Saving…' : 'Save Changes'}</Text>
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function SectionLabel({ title }: { title: string }) {
  return <Text style={s.sectionLabel}>{title}</Text>;
}

function Field({ label, value, onChangeText, icon, keyboardType = 'default' }: {
  label: string; value: string; onChangeText: (v: string) => void;
  icon: string; keyboardType?: any;
}) {
  return (
    <View style={s.fieldWrap}>
      <Text style={s.fieldLabel}>{label}</Text>
      <View style={s.inputRow}>
        <Text style={{ fontSize: 16 }}>{icon}</Text>
        <TextInput
          style={s.input}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize="none"
          placeholderTextColor={C.grey}
        />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  safe:    { flex: 1, backgroundColor: C.white },
  scroll:  { flex: 1, backgroundColor: C.bg },
  content: { paddingBottom: 24 },

  header:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14, backgroundColor: C.white, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: C.border },
  backBtn:     { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  backIcon:    { fontSize: 22, color: C.dark },
  headerTitle: { fontSize: 18, fontWeight: '700', color: C.dark },
  saveBtn:     { fontSize: 15, fontWeight: '700', color: C.purple },

  sectionLabel: { fontSize: 11, fontWeight: '700', color: C.grey, letterSpacing: 1, paddingHorizontal: 16, marginTop: 20, marginBottom: 10 },

  fieldWrap:  { marginHorizontal: 16, marginBottom: 12 },
  fieldLabel: { fontSize: 12, fontWeight: '600', color: C.med, marginBottom: 6 },
  inputRow:   { flexDirection: 'row', alignItems: 'center', backgroundColor: C.white, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 12, gap: 10, borderWidth: 1.5, borderColor: C.border },
  input:      { flex: 1, fontSize: 14, color: C.dark },

  saveBtn2:     { marginHorizontal: 16, marginTop: 24, backgroundColor: C.purple, borderRadius: 14, paddingVertical: 16, alignItems: 'center', ...shadow.sm },
  saveBtn2Text: { color: C.white, fontSize: 16, fontWeight: '700' },
});