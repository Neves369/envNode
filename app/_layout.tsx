// no useEffect needed here
import { TouchableOpacity } from 'react-native';
import { AuthProvider, useAuth } from '../context/auth';
import { Stack, useRouter } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useEffect } from 'react';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '/index',
};

export default function RootLayout() {
  const router = useRouter();
  const { signed } = useAuth();

  useEffect(() => {
    if (!signed && router.canDismiss()) {
      router.replace('/');
    }
  }, [router]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <Stack initialRouteName="index">
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(sub)/account"
            options={{
              headerTitle: 'Minha Conta',
              headerShown: true,
              headerStyle: {
                backgroundColor: 'white',
              },
              headerTintColor: '#438a60',
              headerLeft: () => (
                <TouchableOpacity onPress={() => router.back()} style={{ paddingHorizontal: 16 }}>
                  <Feather name="arrow-left" size={22} color="#438a60" />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen name="modal" options={{ presentation: 'modal', headerShown: false }} />
        </Stack>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
