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
      <Text style={styles.textButtonName}>{item.name ?? '[Sem nome]'}</Text>
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
    height: 60,
    width: '95%',
    elevation: 2,
    marginTop: 10,
    borderRadius: 5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  connectedDevice: {
    backgroundColor: '#989998',
  },
  textButtonName: {
    fontSize: 16,
    marginBottom: 5,
    color: '#438a60',
    fontWeight: 'bold',
  },
  textButtonId: {
    color: '#438a60',
  },
});
