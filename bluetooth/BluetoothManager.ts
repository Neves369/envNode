import { BleManager, Device } from "react-native-ble-plx";
import { create } from "zustand";
import { produce } from "immer";
import base64 from 'base-64';

export const BluetoothManager = new BleManager();

type State = {
  devices: Record<string, Device>;
  isScanning: boolean;
  connectedDevice: Device | null;
  isConnectedAndSupported: boolean | null;
  datas: string[];
  firstTime: boolean | null;
  fileStatus: string,
  file: any;
  monitor: string,
  dataHora: string,
  serial: string,
  version: string,
  scale: string,
  interval: string,
};

// Estado responsável por armazenar todas as informações de conexão 
export const useDevicesStore = create<State>((set, get) => ({
  devices: {},
  connectedDevice: null,
  isScanning: false,
  isConnectedAndSupported: null,
  firstTime: true,
  datas: [],
  fileStatus: '',
  file: '',
  monitor: '',
  dataHora: '',
  serial: '',
  version: '',
  scale: '',
  interval: ''
}));

// Função responsável por atualizar o estado de contexto
const updateStore = function (updater: (state: State) => void) {
  useDevicesStore.setState(produce(useDevicesStore.getState(), updater));
};

// Busca dispositivos próximos
export function doDeviceScan() {
  BluetoothManager.startDeviceScan(null, null, (error, device) => {
    if (error) {
      // Handle error (scanning will be stopped automatically)
      console.error(error);
      return;
    }

    updateStore((state) => {
      // @ts-ignore
      state.devices[device.id] = device;
    });
  });

  updateStore((state) => {
    state.isScanning = true;
  });

  return setTimeout(() => {
    stopScanning();
  }, 3 * 1000);
}

// Encerra a busca por dispositivos
export function stopScanning() {
  updateStore((state) => {
    state.isScanning = false;
  });
  BluetoothManager.stopDeviceScan();
}

// Faz a conexão com o dispositivo
export async function connect(deviceToConnect: any) {
  BluetoothManager.stopDeviceScan();
  await BluetoothManager.connectToDevice(deviceToConnect.id).then(async device => {
    await device.discoverAllServicesAndCharacteristics();
    BluetoothManager.stopDeviceScan();
    device.services().then(async service => {
    });
    updateStore((state) => {
      state.connectedDevice = device;
    });
    let serviceUUID = "0000ffe0-0000-1000-8000-00805f9b34fb"
    let uuid = "0000ffe1-0000-1000-8000-00805f9b34fb";

    // @ts-ignore
    BluetoothManager.monitorCharacteristicForDevice(device.id, serviceUUID, uuid, (error: BleError | null, characteristic: Characteristic | null) => {
      if (error || !characteristic) {
        return 
      }
    
       if (characteristic) {
        const raw = characteristic?.value;
        const decodeVal = base64.decode(raw || "");

        updateStore((state) => {
          state.monitor =  `${decodeVal}`;
        });

        if(useDevicesStore.getState().firstTime === true){
          updateStore((state) => {
            state.firstTime = false;
            state.serial = `${decodeVal.substring(0, 6)}`;
            state.version = `${decodeVal.substring(6, 10)}`;
            state.scale = `${decodeVal.substring(10, 11)}`;
            state.interval = `${decodeVal.substring(11, 15)}`;
          });
        }

        if(decodeVal === 'START_FILE' || decodeVal === 'END_FILE' || decodeVal === 'NO_FILE'){
          updateStore((state) => {
            state.fileStatus = `${decodeVal}`;
          });
        }

        if(useDevicesStore.getState().fileStatus === 'START_FILE'){
          updateStore((state) => {
            state.file = `${useDevicesStore.getState().file} ${decodeVal}`;
          })
        }
      }
     });
  });
}

// Função que verifica se o dispisitivo é suportado e está conectado
export function ConnectedAndSupported(Cs: boolean) {
  updateStore((state) => {
    state.isConnectedAndSupported = Cs
  });
}

// Desconecta o dispositivo
export function disconnect() {
  const dev = useDevicesStore.getState().connectedDevice;
  if (!dev) return;

  BluetoothManager.cancelDeviceConnection(dev.id)
  updateStore((state) => {
    state.devices= {};
    state.connectedDevice= null;
    state.isScanning= false;
    state.isConnectedAndSupported= null;
    state.firstTime= true;
    state.datas= [];
    state.fileStatus= '';
    state.file= '';
    state.monitor= '';
    state.dataHora= '';
    state.serial= '';
    state.version= '';
    state.scale= '';
    state.interval= '';
  });

}

// Atualiza o estado do contexto 
// para que a splashScreen seja 
// chamada somente ao abrir o app
export function ReCall() {
  updateStore((state) => {
    state.firstTime = false
  })    
}

// Atualiza o estado da variável que guarda as datas 
// que serão sincronizadas
export function setDatas(datas: string[]) {
  updateStore((state) => {
    state.datas = datas
    state.fileStatus = ''
    state.file = ''
  })    
}

// Atualiza o estado das variáveis que gerenciam a 
// leitura e envio do arquivo para a api
export function clearSync() {
  updateStore((state) => {
    state.fileStatus= '';
    state.file= '';
    state.monitor= '';
  })    
}


