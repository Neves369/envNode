import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, View, TouchableOpacity, Text, Switch } from 'react-native';

const data2 = ['10', '20', '30', '40', '50', '60'];

export default function TabThreeScreen() {
  const [isFocused, setIsFocused] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true);
  const [selectedIndexInt, setSelectedIndexInt] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        setIsFocused(true);
      }, 2000);
      return () => setIsFocused(false);
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titleCard}>Escala</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
          <Text style={{ marginRight: 10 }}>Celsius</Text>
          <Switch value={!isCelsius} onValueChange={() => setIsCelsius((prev) => !prev)} />
          <Text style={{ marginLeft: 10 }}>Fahrenheit</Text>
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
                backgroundColor: selectedIndexInt === idx ? '#007bff' : '#eee',
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
  },
  card: {
    margin: 5,
    width: '95%',
    alignItems: 'center',
    backgroundColor: '#ffffffa6',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
  },
  titleCard: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
