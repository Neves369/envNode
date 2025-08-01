import { ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity style={styles.item} onPress={() => {}}>
          <ImageBackground
            style={styles.itemHeader}
            source={require('../../assets/images/time.jpg')}>
            {/* <VW style={styles.viewInfo}>
            <Text category='h4' style={styles.title}>Data e Hora</Text>

            <VW
              style={{
                flex: 1,
                flexDirection: 'row', 
                justifyContent: 'center',
                alignContent: 'center'
              }}
            >
              {
                isFocused?
                  store.monitor?
                    <Text style={styles.info}>{clockState}</Text>
                  :
                    <Text style={styles.info}>...</Text>
                :
                  <ActivityIndicator style={styles.loader} color={'white'} size={30}/>
              }
            </VW>
          </VW> */}
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <ImageBackground
            style={styles.itemHeader}
            source={require('../../assets/images/temperatura.png')}>
            {/* <VW style={styles.viewInfo}>
            <Text category='h4' style={styles.title}>Temperatura</Text>

            <VW
              style={{
                flex: 1,
                flexDirection: 'row', 
                justifyContent: 'center',
                alignContent: 'center'
              }}
            >
              <FontAwesome 
                name="thermometer" 
                size={35} 
                color="#e63946" 
              />
              {
                isFocused?
                  store.monitor?
                    <Text style={styles.info}>{`${store.monitor?.substring(0, store.monitor.indexOf('x'))}°`}</Text>
                  :
                    <Text style={styles.info}>...</Text>
                :
                  <ActivityIndicator style={styles.loader} color={'white'} size={30}/>
              }
            </VW>
          </VW> */}
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <ImageBackground
            style={styles.itemHeader}
            source={require('../../assets/images/umidade.png')}>
            {/* <VW style={styles.viewInfo}>
            <Text category='h4' style={styles.title}>Umidade</Text>

            <VW
              style={{
                flex: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.0)',
                flexDirection: 'row', 
                justifyContent: 'center',
                alignContent: 'center'
              }}
            >
              <Ionicons
                name="water" 
                size={35} 
                color="#457b9d" 
              />
              {
                isFocused?
                  store.monitor?
                    <Text style={styles.info}>{`${store.monitor?.substring(store.monitor?.indexOf('x') + 1)}%`}</Text>
                  :
                    <Text style={styles.info}>...</Text>
                :
                  <ActivityIndicator style={styles.loader} color={'white'} size={30}/>
              }
            </VW>
          </VW> */}
          </ImageBackground>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  item: {
    borderRadius: 0,
    width: '100%',
    height: 200,
    marginVertical: 8,
  },
  itemHeader: {
    width: '100%',
    height: '100%',
  },
  itemFooter: {
    flexDirection: 'row',
    marginTop: 15,
    marginHorizontal: -4,
  },
  info: {
    fontSize: 25,
    textAlign: 'center',
    marginLeft: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  loader: {
    textAlign: 'center',
    marginLeft: 10,
    marginTop: -70,
    color: 'white',
  },
  viewInfo: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 100,
    flexDirection: 'row',
  },
});
