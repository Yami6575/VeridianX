import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { DataProvider } from "@/components/trackerContext";

const StackLayout = () => {
  return (
    <SafeAreaView style={styles.container}>
       <DataProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
      
      </DataProvider>
    </SafeAreaView>
  );  
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default StackLayout;
