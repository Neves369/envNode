// @ts-nocheck
import { Device } from "react-native-ble-plx";
import { sendCommandTo } from "../bluetooth/BluetoothDevice";

export async function getInfo(device: Device | null){
  await sendCommandTo(device, "10");
}

export async function getTime(device: Device | null){
  await sendCommandTo(device, "11");
}

export async function getTU(device: Device | null){
  await sendCommandTo(device, "12");
}

export async function getFile(device: Device | null, data: string){
  await sendCommandTo(device, `13_${data}`);
}

export async function setEscala(device: Device | null, escala: string){
  await sendCommandTo(device, `20_${escala}`);
}

export async function setIntLeitura(device: Device | null, intervalo: number){
  await sendCommandTo(device, `21_${intervalo}`);
}
