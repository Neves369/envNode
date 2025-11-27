import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, View, TouchableOpacity, Text, Switch } from 'react-native';
import { useAuth } from '~/context/auth';
import { router } from 'expo-router';

const data2 = ['10', '20', '30', '40', '50', '60'];

export default function TabThreeScreen() {
  const { user } = useAuth();
  const [isFocused, setIsFocused] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true);
  const [selectedIndexInt, setSelectedIndexInt] = useState(0);

  useFocusEffect(
    useCallback(() => {
      console.log('Configurações focado: ', user);
      setTimeout(() => {
        setIsFocused(true);
      }, 2000);
      return () => setIsFocused(false);
    }, [])
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          router.replace('/(sub)/account');
        }}
        style={styles.cardConta}>
        <View style={styles.account}>
          <Text style={{ fontSize: 40, color: 'white' }}>{user?.nome.charAt(0)}</Text>
        </View>
        <Text style={[styles.titleCard, { marginRight: 65 }]}>{user?.nome}</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.titleCard}>Escala</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
          <Text style={{ marginRight: 10, color: isCelsius ? '#438a60' : 'black' }}>Celsius</Text>
          <Switch
            value={!isCelsius}
            onValueChange={() => setIsCelsius((prev) => !prev)}
            thumbColor={!isCelsius ? '#59b37f' : '#f4f3f4'}
          />
          <Text style={{ marginLeft: 10, color: !isCelsius ? '#438a60' : 'black' }}>
            Fahrenheit
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.titleCard}>Intervalo</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10 }}>
          {data2.map((item, idx) => (
            <TouchableOpacity
              key={item}
              style={{
                padding: 10,
                backgroundColor: selectedIndexInt === idx ? '#59b37f' : '#eee',
                margin: 5,
                borderRadius: 5,
              }}
              onPress={() => setSelectedIndexInt(idx)}>
              <Text style={{ color: selectedIndexInt === idx ? '#fff' : '#333' }}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    alignItems: 'center',
    backgroundColor: '#59b37f',
  },
  account: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#59b37f',
  },
  card: {
    margin: 5,
    width: '90%',
    elevation: 5,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  cardConta: {
    margin: 5,
    width: '90%',
    elevation: 5,
    padding: 35,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    fontSize: 26,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleCard: {
    fontSize: 18,
    marginTop: 15,
    color: '#438a60',
    fontWeight: 'bold',
  },
});
