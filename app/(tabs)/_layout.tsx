import { Image } from 'react-native';
import { Link, Tabs } from 'expo-router';
import Logo from '../../assets/images/logo-02.png';
import { TabBarIcon } from '../../components/TabBarIcon';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#59B37F',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Conectar',
          tabBarIcon: ({ color }) => <TabBarIcon name="bluetooth-b" color={color} />,
          headerRight: () => (
            <Link href="/login" style={{ marginRight: 15 }}>
              <Image source={Logo} resizeMode="cover" style={{ width: 50, height: 40 }} />
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <TabBarIcon name="bars" color={color} />,
        }}
      />
      <Tabs.Screen
        name="grafico"
        options={{
          title: 'Gráfico',
          tabBarIcon: ({ color }) => <TabBarIcon name="pie-chart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="sincronizar"
        options={{
          title: 'Sincronizar',
          tabBarIcon: ({ color }) => <TabBarIcon name="paper-plane" color={color} />,
        }}
      />
      <Tabs.Screen
        name="configuracoes"
        options={{
          title: 'Configurações',
          tabBarIcon: ({ color }) => <TabBarIcon name="sliders" color={color} />,
        }}
      />
    </Tabs>
  );
}
