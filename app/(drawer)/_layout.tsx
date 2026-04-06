import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { router } from 'expo-router';;
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';


function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Home"
        icon={({ color }) => <Ionicons name="home" size={24} color={color} />}
        onPress={() => router.push('/(drawer)/(tabs)')}
      />
      <DrawerItem
        label="Profile"
        icon={({ color }) => <Ionicons name="person" size={24} color={color} />}
        onPress={() => {
          props.navigation.closeDrawer();
          router.push('/(drawer)/(tabs)/(screens)/profile');
        }}
      />
      <DrawerItem
        label="Change Password"
        icon={({ color }) => <Ionicons name="lock-closed" size={24} color={color} />}
        onPress={() => {
          props.navigation.closeDrawer();
          router.push('/(drawer)/(tabs)/(screens)/changepassword');
        }}
      />
      <DrawerItem
        label="Help"
        icon={({ color }) => <Ionicons name="help-circle" size={24} color={color} />}
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            drawerIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
            title: 'Home',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}