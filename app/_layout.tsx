import { useEffect } from 'react';
import { useAuth } from '../context/auth';
import { Stack, useRouter } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '/login',
};

export default function RootLayout() {
  const router = useRouter();
  const { signed }: { signed: boolean } = useAuth() ?? {
    signed: false,
  };

  useEffect(() => {
    if (!signed) {
      // router.replace('/login');
    }
  }, [router]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack initialRouteName="index">
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
