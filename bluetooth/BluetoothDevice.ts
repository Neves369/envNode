import { create } from "zustand";
import { produce } from "immer";
import { Buffer } from "buffer";
import base64, { decode } from 'base-64';
import { BleError, Characteristic, Device } from "react-native-ble-plx";
import { BluetoothManager, useDevicesStore } from "./BluetoothManager";

type State = {
  connectedDevice: Device | null;
  response: any;
};

// Estado responsável por armazenar as respostas vindas do módulo 
export const useInfoStore = create<State>((set, get) => ({
  connectedDevice: null,
  response: null,

}));

// Função responsável por atualizar o estado de contexto
const updateStore = function (updater: (state: State) => void) {
  useInfoStore.setState(produce(useInfoStore.getState(), updater));
};


// UUIDs for HM-10 BLE module
// Module page (PL): https://botland.com.pl/moduly-bluetooth/9515-modul-bluetooth-40-ble-hm-10-at-09-mlt-bt05-33v5v-5904422313524.html
// Nice HM-10 comprehensive guide: http://www.martyncurrey.com/hm-10-bluetooth-4ble-modules/
export const BT05_SERVICE_UUID_PREFIX = "0000ffe0"; // 0000ffe0-0000-1000-8000-00805f9b34fb
export const BT05_CHARACTERISTIC_UUID_PREFIX = "0000ffe1"; // 0000ffe1-0000-1000-8000-00805f9b34fbex

/**
 * Checa se o dispositivo possui as características necessárias para a comunicação
 */
export async function isDeviceSupported(device?: Device): Promise<boolean> {
  const services = await device?.services();
  const serialService = services?.find((it) =>
    it.uuid.startsWith(BT05_SERVICE_UUID_PREFIX)
  );
  const characteristics = await serialService?.characteristics();
  const serialCharacteristic = characteristics?.find((it) =>
    it.uuid.startsWith(BT05_CHARACTERISTIC_UUID_PREFIX)
  );
  return serialCharacteristic != null;
}

/**
 * Método genérico para envio de comandos para o módulo
 */
export async function sendCommandTo(device: Device, command: string) {

 const writeServiceUUID = "0000ffe0-0000-1000-8000-00805f9b34fb"
 const writeCharacteristicUUID = "0000ffe2-0000-1000-8000-00805f9b34fb"
 let valorRetorno: string;


 let response =  await BluetoothManager.writeCharacteristicWithResponseForDevice(
  device.id,
  writeServiceUUID,
  writeCharacteristicUUID,
  Buffer.from(`${command}`).toString("base64")
  )

console.log("Resposta do comando ", command, ": ", response);
  
  updateStore((state) => {
    state.response = response
  });
 
}

export function clearInformation() {
  updateStore((state) => {
    state.connectedDevice = null;
    state.response = null;
  });
}