import React from 'react';
import { Tabs } from 'expo-router';
import { CommonHeader } from '../../components/CommonHeader';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        header: () => <CommonHeader />,
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
      {/* Add other tab screens here */}
    </Tabs>
  );
}