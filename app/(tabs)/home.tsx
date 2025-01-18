import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { FIREBASE_AUTH } from '@/FirebaseConfig';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text>Welcome to Home Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;