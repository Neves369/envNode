import { useState } from 'react';
import { DeviceList } from '~/components/DeviceList';
import { Button, StyleSheet, View, Text } from 'react-native';
import { changeFirstTime, global } from '~/store/GlobalStates';
import { useDevicesStore } from '~/bluetooth/BluetoothManager';

export default function Home() {
  const [state, setState] = useState('PoweredOff');

  const globalStates = global((state) => state);
  const store = useDevicesStore((state) => state);

  return (
    <>
      <View style={styles.container}>
        <Button
          title={state !== 'PoweredOn' ? 'Ligar Bluetooth' : 'Procurar Dispositivos'}
          onPress={() => {}}
        />

        {/* <Text style={styles.title}>Dispositivos encontrados</Text> */}
        {store.devices.lengh > 0 && (
          <DeviceList
            devices={Object.values(store.devices)}
            isScanning={true}
            onScanRefresh={() => {}}
            onConnectClick={(id) => {}}
            connectedDeviceId={null}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    margin: 5,
  },
  footerContainer: {
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
