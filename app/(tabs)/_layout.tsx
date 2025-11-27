import { Link, Tabs } from 'expo-router';
import { Image, View } from 'react-native';
import Logo from '../../assets/images/logo-02.png';
import { TabBarIcon } from '../../components/TabBarIcon';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#59B37F',
        headerTitleStyle: {
          color: '#438a60',
          fontWeight: 'bold',
        },
        tabBarStyle: {
          elevation: 5,
          backgroundColor: 'whitesmoke',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Conectar',
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 80,
                height: 60,
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomLeftRadius: 40,
                borderBottomRightRadius: 40,
                backgroundColor: focused ? '#438a60' : 'transparent',
              }}>
              <TabBarIcon
                name="bluetooth-b"
                color={focused ? 'white' : '#59B37F'}
                focused={focused}
              />
            </View>
          ),
          headerRight: () => (
            <Link href="/modal" style={{ marginRight: 15 }}>
              <Image source={Logo} resizeMode="cover" style={{ width: 50, height: 40 }} />
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 80,
                height: 60,
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomLeftRadius: 40,
                borderBottomRightRadius: 40,
                backgroundColor: focused ? '#438a60' : 'transparent',
              }}>
              <TabBarIcon name="bars" color={focused ? 'white' : '#59B37F'} focused={focused} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="grafico"
        options={{
          title: 'Gráfico',
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 80,
                height: 60,
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomLeftRadius: 40,
                borderBottomRightRadius: 40,
                backgroundColor: focused ? '#438a60' : 'transparent',
              }}>
              <TabBarIcon
                name="pie-chart"
                color={focused ? 'white' : '#59B37F'}
                focused={focused}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="sincronizar"
        options={{
          title: 'Sincronizar',
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 80,
                height: 60,
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomLeftRadius: 40,
                borderBottomRightRadius: 40,
                backgroundColor: focused ? '#438a60' : 'transparent',
              }}>
              <TabBarIcon
                name="paper-plane"
                color={focused ? 'white' : '#59B37F'}
                focused={focused}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="configuracoes"
        options={{
          title: 'Configurações',
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 80,
                height: 60,
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomLeftRadius: 40,
                borderBottomRightRadius: 40,
                backgroundColor: focused ? '#438a60' : 'transparent',
              }}>
              <TabBarIcon name="sliders" color={focused ? 'white' : '#59B37F'} focused={focused} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
