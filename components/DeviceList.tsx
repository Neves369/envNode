import React from 'react';
import { Device } from 'react-native-ble-plx';
import { ListRenderItem, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  devices: Device[];
  connectedDeviceId?: string | null;
  onConnectClick?: (deviceId: string) => void;
  onScanRefresh?: () => void;
  isScanning?: boolean;
}

export function DeviceList(props: Props) {
  const renderItem: ListRenderItem<Device> = ({ item }) => (
    <TouchableOpacity
      style={[styles.device, props.connectedDeviceId === item.id ? styles.connectedDevice : {}]}
      onPress={() => props.onConnectClick?.(item.id)}>
      <Text style={styles.textButtonName}>{item.name ?? '[No name]'}</Text>
      <Text style={styles.textButtonId}>{`ID: ${item.id}`}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={props.devices}
      style={{ width: '100%' }}
      contentContainerStyle={{ paddingBottom: 10 }}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      refreshing={props.isScanning ?? false}
      onRefresh={props.onScanRefresh}
    />
  );
}

const styles = StyleSheet.create({
  device: {
    marginTop: 10,
    backgroundColor: '#2f95dc',
    width: '95%',
    height: 60,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectedDevice: {
    backgroundColor: '#38b000',
  },
  textButtonName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  textButtonId: {
    color: 'white',
  },
});
