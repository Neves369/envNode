import * as FileSystem from 'expo-file-system';
import * as Gateway from '../../gateway/Gateway';
import Sync from '~/components/animations/Sync';
import Pulse from '~/components/animations/Pulse';
import database from '@react-native-firebase/database';
import { useCallback, useEffect, useState } from 'react';

import { useFocusEffect } from '@react-navigation/native';
import { clearSync, disconnect, useDevicesStore } from '~/bluetooth/BluetoothManager';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { _base64ToArrayBuffer } from '~/utils/ToArrayBuffer';

export default function Sincronizar() {
  const reference = database().ref('/ambiente');
  const [visible, setVisible] = useState(false);
  const store = useDevicesStore((state) => state);
  const [erroSync, setErroSync] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [lengthDatas, setLengthDatas] = useState(0);
  const [lengthEnvio, setLengthEnvio] = useState(1);
  const [datas, setDatas] = useState<Array<string>>([]);
  const [inicializando, setInicializando] = useState(false);
  const [messageErroSync, setMessageErroSync] = useState('');

  useFocusEffect(
    useCallback(() => {
      setDatas([]);
      clearSync();
      setInicializando(false);
      setTimeout(() => {
        setIsFocused(true);
      }, 2000);
      return () => setIsFocused(false);
    }, [])
  );

  // Ouve as mudanças no status do arquivo
  useEffect(() => {
    if (isFocused) {
      if (store.fileStatus === 'END_FILE' || store.fileStatus === 'NO_FILE') {
        saveFile();
      }
    }
  }, [isFocused, store.fileStatus]);

  // 1ª Etapa -  Função para pegar as datas dessincronizadas
  const PegarDatasDessincronizadas = async () => {
    // setInicializando(true)
    // await SyncService.GetData(store.serial)
    // .then(async(resp: any)=>{
    //   if(resp.status == 200){
    //     setDatas(resp.data)
    PegarDatasDoModulo('00000000');
    //     setLengthDatas(resp.data.length)
    //   }
    //   else{
    //     setVisible(true)
    //     setErroSync(true)
    //     setMessageErroSync("Erro, não foi possível buscar dados")
    //     setTimeout(() => {
    //       setVisible(false)
    //       setErroSync(false)
    //       setMessageErroSync("")
    //       setInicializando(false)
    //     }, 2000);
    //   }
    // })
  };

  // 2ª Etapa - Função para pegar os dados do módulo
  // Não precisa de retorno, o retorno é tratado no BluetoothManager.tsx
  const PegarDatasDoModulo = async (data: string) => {
    Gateway.getFile(store.connectedDevice, data.replace(/\//g, ''));
  };

  // 3ª Etapa - Função para salvar o arquivo e enviar para o servidor
  const saveFile = async () => {
    try {
      let fileUri =
        FileSystem.documentDirectory +
        `relatorios/TU_${store.serial}${datas[datas.length - 1].replace(/\//g, '')}.txt`;
      await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'relatorios/');
      await FileSystem.writeAsStringAsync(fileUri, store.file.replace('START_FILE', ''));
      const Base64 = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      let arrayBuffer = _base64ToArrayBuffer(Base64);
      // Enviar para o servidor (continuar depois)
    } catch (error) {
      console.log('Erro ao salvar o arquivo: ', error);
    }
  };

  return (
    <View style={styles.container}>
      {inicializando ? (
        <>
          <Sync />
          <TouchableOpacity onPress={() => {}} style={styles.roundButton2}>
            <Text style={styles.textButtom2}>SINCRONIZANDO</Text>
            <Text style={styles.length}>{`${lengthEnvio} de ${lengthDatas}`}</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Pulse />
          <TouchableOpacity
            onPress={() => {
              PegarDatasDessincronizadas();
            }}
            style={styles.roundButton1}>
            <Text style={styles.textButtom}>INICIAR</Text>
          </TouchableOpacity>
        </>
      )}

      {/* <Text>{timerCount}</Text> */}
      <Modal animationType="fade" visible={visible} transparent={true}>
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={styles.card}>
            {erroSync ? (
              <>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  Falha ao sincronizar
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    marginTop: 10,
                    textAlign: 'center',
                  }}>
                  {messageErroSync}
                </Text>
              </>
            ) : (
              <>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  Sincronizado com Sucesso!
                </Text>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    minHeight: 200,
    minWidth: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButtom: {
    color: '#1d4d6e',
    fontSize: 26,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  textButtom2: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  length: {
    marginTop: 20,
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  roundButton1: {
    position: 'absolute',
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 250,
    borderWidth: 5,
    borderColor: '#2f95dc',
  },
  roundButton2: {
    position: 'absolute',
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 250,
    // borderWidth: 5,
    // borderColor: '#2f95dc',
  },
});
