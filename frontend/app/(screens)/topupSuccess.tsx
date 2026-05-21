import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, StatusBar as RNStatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { C } from '../../constants/Theme';

export default function TopUpSuccessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.iconBg}>
            <Ionicons name="checkmark-sharp" size={48} color="#0B8E36" />
          </View>
        </View>

        <Text style={styles.title}>Top Up Successful</Text>
        <Text style={styles.subtitle}>
          Your new balance is <Text style={styles.strongText}>$1,300.50</Text>
        </Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Transaction ID</Text>
            <Text style={styles.valDark}>#TXN-8829-BK</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Payment Method</Text>
            <View style={styles.methodWrap}>
              <Ionicons name="card-outline" size={16} color={C.dark} />
              <Text style={styles.valDark}>Visa **** 4242</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Top Up Amount</Text>
            <Text style={styles.valGreen}>+$500.00</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.primaryBtn} 
            onPress={() => router.push('/(screens)/ClientsDashbord')}
          >
            <Text style={styles.primaryBtnText}>Go to Dashboard</Text>
            <Ionicons name="arrow-forward" size={18} color={C.white} style={{ marginLeft: 4 }} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryBtn}
            onPress={() => router.push('/(screens)/TransactionHistory')}
          >
            <Text style={styles.secondaryBtnText}>View Transactions</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.shareBtn}>
          <Ionicons name="share-social-outline" size={16} color={C.purple} />
          <Text style={styles.shareText}>Share Confirmation</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { 
    flex: 1, 
    backgroundColor: '#F8F9FA', 
    paddingTop: Platform.OS === 'android' ? (RNStatusBar.currentHeight || 24) : 0 
  },
  content: { 
    flex: 1, 
    paddingHorizontal: 24, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  
  iconContainer: {
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#76E5A4', // Light green
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#22C55E',
    shadowOpacity: 0.2,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  
  title: { 
    fontSize: 24, 
    fontWeight: '800', 
    color: C.dark, 
    marginBottom: 8 
  },
  subtitle: { 
    fontSize: 15, 
    color: C.med, 
    marginBottom: 40 
  },
  strongText: { 
    fontWeight: '700', 
    color: C.dark 
  },

  card: { 
    backgroundColor: C.white, 
    borderRadius: 20, 
    padding: 24, 
    width: '100%', 
    shadowColor: '#000', 
    shadowOpacity: 0.04, 
    shadowRadius: 10, 
    shadowOffset: { width: 0, height: 4 }, 
    elevation: 3, 
    marginBottom: 40 
  },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  divider: { 
    height: 1, 
    backgroundColor: '#F3F4F6', 
    marginVertical: 16 
  },
  label: { 
    fontSize: 13, 
    color: C.med, 
    fontWeight: '500' 
  },
  valDark: { 
    fontSize: 13, 
    fontWeight: '700', 
    color: C.dark 
  },
  valGreen: { 
    fontSize: 14, 
    fontWeight: '700', 
    color: '#0B8E36' // Darker green
  },
  methodWrap: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 6 
  },

  actions: { 
    width: '100%', 
    gap: 16, 
    marginBottom: 40 
  },
  primaryBtn: { 
    flexDirection: 'row', 
    backgroundColor: C.purple, 
    paddingVertical: 18, 
    borderRadius: 16, 
    alignItems: 'center', 
    justifyContent: 'center', 
    shadowColor: C.purple, 
    shadowOpacity: 0.3, 
    shadowRadius: 8, 
    shadowOffset: { width: 0, height: 4 }, 
    elevation: 5 
  },
  primaryBtnText: { 
    color: C.white, 
    fontSize: 15, 
    fontWeight: '600' 
  },
  secondaryBtn: { 
    backgroundColor: '#F3EEFF', // Light purple
    paddingVertical: 18, 
    borderRadius: 16, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  secondaryBtnText: { 
    color: C.dark, 
    fontSize: 14, 
    fontWeight: '600' 
  },

  shareBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8, 
    marginTop: 'auto', 
    marginBottom: 20 
  },
  shareText: { 
    fontSize: 13, 
    fontWeight: '600', 
    color: C.purple 
  },
});