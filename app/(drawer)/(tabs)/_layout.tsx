import { router, Tabs, useNavigation } from 'expo-router';
import React from 'react';
import { HapticTab } from '@/components/haptic-tab';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import Fontisto from '@expo/vector-icons/Fontisto';
import { Pressable, View } from 'react-native';
import { FONT_SIZES, FONTS } from '.';
import AntDesign from '@expo/vector-icons/AntDesign';
import { DrawerActions } from '@react-navigation/native'; 

export const NotificationIcon = () => {
  const navigation = useNavigation(); 

  const openDrawer = () => {
    navigation.getParent()?.dispatch(DrawerActions.toggleDrawer()); 
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <Pressable onPress={() => console.log('')} style={{ marginRight: 16 }}>
        <Ionicons name="notifications-outline" size={20} color="black" />
      </Pressable>
      <Pressable onPress={openDrawer} style={{ marginRight: 16 }}>  
        <AntDesign name="menu" size={18} color="black" />
      </Pressable>
    </View>
  );
};

export const BackButton = () => (
  <Pressable 
    onPress={() => router.replace('/(drawer)/(tabs)')} 
    style={{ marginLeft: 1, marginRight: 5 }}
  >
    <Ionicons name="arrow-back" size={24} color="black" />
  </Pressable>
);

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
  screenOptions={{
    tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
    headerShown: true,
    headerStyle: {
      backgroundColor: 'white',   
    },
    headerTitleStyle: {
      fontFamily: FONTS.bold,
      fontSize: FONT_SIZES.xl,
      color: 'black',              
    },
    tabBarStyle: {
      backgroundColor: 'white',   
    },
    tabBarInactiveTintColor: 'grey', 
    headerRight: () => <NotificationIcon />,
    tabBarButton: HapticTab,
  }}>
      <Tabs.Screen name="index" options={{ title: 'Meals', tabBarIcon: ({ color }) => <Ionicons size={28} name="home" color={color} /> }} />
      <Tabs.Screen name="explore" options={{ title: 'Explore', headerLeft: () => <BackButton />, tabBarIcon: ({ color }) => <Fontisto name="export" size={24} color={color} /> }} />
      <Tabs.Screen name="about" options={{ title: 'About', headerLeft: () => <BackButton />, tabBarIcon: ({ color }) => <Ionicons name="information-circle" size={24} color={color} /> }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings', headerLeft: () => <BackButton />, tabBarIcon: ({ color }) => <Ionicons size={28} name="settings" color={color} /> }} />
      <Tabs.Screen name="(screens)" options={{ href: null, headerShown: false }} />
    </Tabs>
  );
}