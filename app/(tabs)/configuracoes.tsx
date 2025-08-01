import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { 
  StyleSheet,
  View,  
} from 'react-native';

const data = ['Celsius', 'Fahrenheit'];
const data2 = ['10','20','30','40','50','60'];

export default function TabThreeScreen() {

  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedIndexInt, setSelectedIndexInt] = useState(0);
    


  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        setIsFocused(true)
      },2000);
      return () => setIsFocused(false);
    }, [])
  );



  return (
    <View style={styles.container}>
      <View style={styles.card}>
      {/* <Select
        placeholder='Escala'
        value={displayValue}
        selectedIndex={selectedIndex}
        onSelect={index => setarEscala(index)}>
        {data.map(renderOption)}
      </Select> */}
      <View  style={{marginTop: 15}}/>
      {/* <Select
        placeholder='Intervalo'
        value={displayValue2}
        selectedIndex={selectedIndexInt}
        onSelect={index => setarIntervalo(index)}>
        {data2.map(renderOption)}
      </Select> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    width: '95%',
    margin: 5
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white'
  },
  titleCard: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: 'bold',
  }
});
