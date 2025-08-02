import { useCallback, useState } from 'react';
import Sync from '~/components/animations/Sync';
import Pulse from '~/components/animations/Pulse';
import { useFocusEffect } from '@react-navigation/native';
import { clearSync, disconnect, useDevicesStore } from '~/bluetooth/BluetoothManager';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

export default function Sincronizar() {
  const store = useDevicesStore((state) => state);
  const [visible, setVisible] = useState(false);
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

  return (
    <View style={styles.container}>
      {!inicializando ? (
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
          <TouchableOpacity onPress={() => {}} style={styles.roundButton1}>
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
