import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { router } from 'expo-router';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View } from 'react-native';

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView
      {...props}
      style={{ backgroundColor: 'white' }}  
    >
      <DrawerItem
        label="Home"
        labelStyle={{ color: 'black' }}  
        icon={({ color }) => <Ionicons name="home" size={24} color="black" />}
        onPress={() => router.push('/(drawer)/(tabs)')}
      />
      <DrawerItem
        label="Profile"
        labelStyle={{ color: 'black' }}
        icon={({ color }) => <Ionicons name="person" size={24} color="black" />}
        onPress={() => {
          props.navigation.closeDrawer();
          router.push('/(drawer)/(tabs)/(screens)/profile');
        }}
      />
      <DrawerItem
        label="Change Password"
        labelStyle={{ color: 'black' }}
        icon={({ color }) => <Ionicons name="lock-closed" size={24} color="black" />}
        onPress={() => {
          props.navigation.closeDrawer();
          router.push('/(drawer)/(tabs)/(screens)/changepassword');
        }}
      />
      <DrawerItem
        label="Help"
        labelStyle={{ color: 'black' }}
        icon={({ color }) => <Ionicons name="help-circle" size={24} color="black" />}
        onPress={() => {
          props.navigation.closeDrawer();
          router.push('/(drawer)/(tabs)/(screens)/help');
        }}
      />
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'white' }}> 
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerStyle: { backgroundColor: 'white' },  
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            drawerIcon: ({ color }) => <Ionicons name="home" size={24} color="black" />,
            title: 'Home',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}