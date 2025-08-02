import { useEffect, useState } from 'react';
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
  const [state, setState] = useState('PoweredOff');
  const [loading, setLoading] = useState(false);
  const [scaneado, setScaneado] = useState(false);
  const globalStates = global((state) => state);
  const store = useDevicesStore((state) => state);

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
          <Text style={{ color: 'red', marginTop: 20 }}>
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
  },
  card: {
    width: '100%',
    margin: 5,
  },
  footerContainer: {
    width: '100%',
    height: 50,
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
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 30,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
