import { Stack, router } from 'expo-router';
import { BackButton } from '../_layout';
export default function ScreensLayout() {
  return (
    <Stack>
    <Stack.Screen name="details" options={{ title: 'Meal Details', headerLeft: () => <BackButton /> }} />
    <Stack.Screen name="addtocart" options={{ title: 'Add to Cart', headerLeft: () => <BackButton /> }} />
    <Stack.Screen name="profile" options={{ title: 'Profile', headerLeft: () => <BackButton /> }} />
    <Stack.Screen name="help" options={{ title: 'Help', headerLeft: () => <BackButton /> }} />
    <Stack.Screen name="changepassword" options={{ title: 'Change Password', headerLeft: () => <BackButton /> }} />
  </Stack>
  );
}