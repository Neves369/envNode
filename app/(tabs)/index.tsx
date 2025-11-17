import { useEffect, useState, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { DeviceList } from '~/components/DeviceList';
import { Button, StyleSheet, View, Text, Platform, PermissionsAndroid } from 'react-native';
import { changeFirstTime, global } from '~/store/GlobalStates';
import {
  connect,
  disconnect,
  doDeviceScan,
  stopScanning,
  useDevicesStore,
  BluetoothManager,
} from '~/bluetooth/BluetoothManager';

export default function Home() {
  const navigation = useNavigation();
  const [state, setState] = useState('PoweredOff');
  const [loading, setLoading] = useState(false);
  const [scaneado, setScaneado] = useState(false);
  const globalStates = global((state) => state);
  const store = useDevicesStore((state) => state);

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: 'Monitora AÍ' });
  }, [navigation]);

  useEffect(() => {
    const subscription = BluetoothManager.onStateChange((state) => {
      setState(state);
    }, true);

    return () => {
      subscription.remove();
    };
  }, []);

  const requestBluetoothPermissions = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);
    }
  };

  // Procura por dispositivos Bluetooth próximos
  const scanDevices = async () => {
    await requestBluetoothPermissions();
    BluetoothManager.state().then((state) => {
      if (state === 'PoweredOn') {
        setScaneado(true);
        doDeviceScan();
      }
    });
    return stopScanning;
  };

  // Conecta ao dispositivo selecionado
  const Conectar = (id: any) => {
    try {
      setLoading(true);
      connect(store.devices[id]);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao conectar:', error);
      setLoading(false);
    }
  };

  return (
    <>
      <View style={styles.container}>
        {Object.values(store.devices).length <= 0 && (
          <Button
            color={'#438a60'}
            disabled={state !== 'PoweredOn'}
            title={'Procurar Dispositivos'}
            onPress={scanDevices}
          />
        )}

        {Object.values(store.devices).length > 0 && (
          <>
            <Text style={styles.title}>Dispositivos encontrados</Text>
            <DeviceList
              devices={Object.values(store.devices)}
              isScanning={store.isScanning}
              onScanRefresh={doDeviceScan}
              onConnectClick={(id) => {
                Conectar(id);
              }}
              connectedDeviceId={store.connectedDevice?.id ?? null}
            />
          </>
        )}

        {state === 'PoweredOff' && (
          <Text style={{ color: '#e7e6e6', marginTop: 20 }}>
            Bluetooth está desligado. Por favor, ative o Bluetooth.
          </Text>
        )}

        {store.connectedDevice && (
          <View style={styles.footerContainer}>
            <Button
              color="#d61010"
              title="Desconectar"
              disabled={!store.connectedDevice}
              onPress={() => {
                disconnect();
              }}
            />
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#59b37f',
  },
  card: {
    width: '100%',
    margin: 5,
  },
  footerContainer: {
    height: 50,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerControl: {
    width: 150,
    margin: 2,
  },
  button: {
    backgroundColor: 'blue',
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    color: 'white',
  },
  title: {
    fontSize: 20,
    marginTop: 15,
    color: 'white',
    marginBottom: 30,
    fontWeight: 'bold',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
