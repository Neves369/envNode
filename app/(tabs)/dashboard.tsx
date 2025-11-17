import { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import { useFocusEffect } from 'expo-router';
import * as Gateway from '../../gateway/Gateway';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { clearInformation } from '../../bluetooth/BluetoothDevice';
import { BluetoothManager, disconnect, useDevicesStore } from '../../bluetooth/BluetoothManager';

export default function Home() {
  const store = useDevicesStore((state) => state);
  const [isFocused, setIsFocused] = useState(false);
  const [clockState, setClockState] = useState<any>();
  const [timerCount, setTimer] = useState<number>(60);

  useFocusEffect(
    useCallback(() => {
      // console.log('Entrou');
      Gateway.getTU(store.connectedDevice);
      setTimer(60);
      setTimeout(() => {
        setIsFocused(true);
      }, 2000);
      return () => setIsFocused(false);
    }, [])
  );

  useEffect(() => {
    if (isFocused) {
      BluetoothManager.onStateChange((state) => {
        const subscription = BluetoothManager.onStateChange((state) => {
          if (state === 'PoweredOff') {
            disconnect();
            clearInformation();
            subscription.remove();
            setTimeout(() => {
              // navigation.navigate('TabOne');
            }, 1000);
          }
        }, true);
        return () => subscription.remove();
      });
    }
  }, [BluetoothManager]);

  useEffect(() => {
    if (timerCount === 0 && store.connectedDevice !== null && isFocused === true) {
      setTimeout(() => {
        Gateway.getTU(store.connectedDevice);
      }, 1000);
      return setTimer(60);
    }

    let interval = setInterval(() => {
      if (timerCount > 0) {
        setTimer((lastTimerCount) => {
          lastTimerCount <= 1 && clearInterval(interval);
          return lastTimerCount - 1;
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timerCount]);

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setClockState(date.toLocaleTimeString());
    }, 500);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            console.log(store.monitor);
          }}>
          <ImageBackground
            style={styles.itemHeader}
            source={require('../../assets/images/time.jpg')}>
            <View style={styles.viewInfo}>
              <Text style={styles.title}>Data e Hora</Text>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignContent: 'center',
                }}>
                {isFocused ? (
                  store.monitor && <Text style={styles.info}>{clockState}</Text>
                ) : (
                  <Text style={styles.info}>{clockState}</Text>
                )}
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <ImageBackground
            style={styles.itemHeader}
            source={require('../../assets/images/temperatura.png')}>
            <View style={styles.viewInfo}>
              <Text style={styles.title}>Temperatura</Text>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignContent: 'center',
                }}>
                {isFocused ? (
                  store.monitor && (
                    <>
                      {/* <Text
                        style={
                          styles.info
                        }>{`${store.monitor?.substring(0, store.monitor.indexOf('x'))}°`}</Text> */}
                      <Text style={styles.info}>{`26°C`}</Text>

                      <FontAwesome name="thermometer" size={35} color="#e63946" />
                    </>
                  )
                ) : (
                  <>
                    <Text style={styles.info}>{`26°C`}</Text>
                    <FontAwesome name="thermometer" size={35} color="#e63946" />
                  </>
                )}
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <ImageBackground
            style={styles.itemHeader}
            source={require('../../assets/images/umidade.png')}>
            <View style={styles.viewInfo}>
              <Text style={styles.title}>Umidade</Text>

              <View
                style={{
                  flex: 1,
                  backgroundColor: 'rgba(0, 0, 0, 0.0)',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignContent: 'center',
                }}>
                {isFocused ? (
                  store.monitor && (
                    <>
                      {/* <Text
                        style={
                          styles.info
                        }>{`${store.monitor?.substring(store.monitor?.indexOf('x') + 1)}%`}</Text> */}
                      <Text style={styles.info}>{`79%`}</Text>
                      <Ionicons name="water" size={35} color="#457b9d" />
                    </>
                  )
                ) : (
                  <>
                    <Text style={styles.info}>{`79%`}</Text>
                    <Ionicons name="water" size={35} color="#457b9d" />
                  </>
                )}
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#59b37f',
  },
  title: {
    flex: 1,
    fontSize: 26,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  separator: {
    height: 1,
    width: '100%',
    marginVertical: 30,
  },
  item: {
    height: 200,
    elevation: 5,
    width: '100%',
    marginVertical: 8,
  },
  itemHeader: {
    width: '100%',
    height: '100%',
  },
  itemFooter: {
    marginTop: 15,
    flexDirection: 'row',
    marginHorizontal: -4,
  },
  info: {
    fontSize: 25,
    marginLeft: 10,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loader: {
    marginLeft: 10,
    marginTop: -70,
    color: 'white',
    textAlign: 'center',
  },
  viewInfo: {
    bottom: 0,
    height: 100,
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
  },
});
