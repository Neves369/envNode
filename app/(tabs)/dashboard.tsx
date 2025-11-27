import { useCallback, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { subscribeToLatestReading } from '../../services/RealtimeService';
import { useDevicesStore } from '../../bluetooth/BluetoothManager';

export default function Home() {
  const store = useDevicesStore((state) => state);
  const [isFocused, setIsFocused] = useState(false);
  const [clockState, setClockState] = useState<any>();
  const [latestReading, setLatestReading] = useState<any>(null);

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        setIsFocused(true);
      }, 2000);
      const unsubscribe = subscribeToLatestReading('/sensors/data', (reading) => {
        console.log('Latest reading (realtime):', reading);
        setLatestReading(reading);
        if (reading?.timestamp) {
          const ts =
            reading.timestamp && reading.timestamp < 1e12
              ? reading.timestamp * 1000
              : reading.timestamp;
          setClockState(new Date(ts).toLocaleString());
        }
      });

      return () => {
        unsubscribe && unsubscribe();
        setIsFocused(false);
      };
    }, [])
  );

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
              <Text style={styles.title}>Sincronizado</Text>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignContent: 'center',
                }}>
                {isFocused ? (
                  latestReading ? (
                    <Text style={styles.info}>{clockState}</Text>
                  ) : (
                    <Text style={styles.info}>--</Text>
                  )
                ) : (
                  <Text style={styles.info}>{clockState}</Text>
                )}
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <ImageBackground
            blurRadius={5}
            style={styles.itemHeader}
            source={require('../../assets/images/temperatura.png')}>
            <View style={[StyleSheet.absoluteFill, { backgroundColor: '#adadad', opacity: 0.2 }]} />
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
                  latestReading ? (
                    <>
                      <Text style={styles.info}>{`${latestReading.temperature ?? '--'}°C`}</Text>
                      <FontAwesome name="thermometer" size={35} color="#e63946" />
                    </>
                  ) : (
                    <>
                      <Text style={styles.info}>{`--°C`}</Text>
                      <FontAwesome name="thermometer" size={35} color="#e63946" />
                    </>
                  )
                ) : (
                  <>
                    <Text style={styles.info}>{`${latestReading?.temperature ?? '--'}°C`}</Text>
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
                  latestReading ? (
                    <>
                      <Text style={styles.info}>{`${latestReading.humidity ?? '--'}%`}</Text>
                      <Ionicons name="water" size={35} color="#457b9d" />
                    </>
                  ) : (
                    <>
                      <Text style={styles.info}>{`--%`}</Text>
                      <Ionicons name="water" size={35} color="#457b9d" />
                    </>
                  )
                ) : (
                  <>
                    <Text style={styles.info}>{`${latestReading?.humidity ?? '--'}%`}</Text>
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
    backgroundColor: '#438a60',
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
