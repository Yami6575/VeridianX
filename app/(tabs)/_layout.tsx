import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import { Tabs } from 'expo-router';
import { CommonHeader } from '../../components/CommonHeader';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import { signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';

export default function TabLayout() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(FIREBASE_AUTH);
    router.replace('/Login');
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        header: () => (
          <View style={styles.headerContainer}>
            <CommonHeader />
            <View style={styles.profileContainer}>
              <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
                <Image
                  source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} // Default profile image
                  style={styles.profileImage}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
                <Text style={styles.signOutText}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        ),
      }}
    >
      <Tabs.Screen 
        name="home"
        options={{
          title: 'Home',
          // Add your tab icons here
        }}
      />
      <Tabs.Screen 
        name="resources"
        options={{
          title: 'Resources for you',
          // Add your tab icons here
        }}
      />
      <Tabs.Screen 
        name="Discover"
        options={{
          title: 'Discover',
          // Add your tab icons here
        }}
      />
      <Tabs.Screen 
        name="Progress"
        options={{
          title: 'Progress',
          // Add your tab icons here
        }}
      />
     
      {/* Add other tab screens here */}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  signOutButton: {
    padding: 10,
  },
  signOutText: {
    color: '#8B4513',
  },
});