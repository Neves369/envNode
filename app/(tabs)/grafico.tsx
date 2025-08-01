// import Moment from 'moment';
// import { View } from '../components/Themed';
// import { Text } from "@ui-kitten/components";
// import { RootTabScreenProps } from '../types';
// import SyncService from '../services/SyncService';
// import GerarGrafico from '../components/GerarGrafico';
// import { useFocusEffect } from '@react-navigation/native';
// import { _base64ToArrayBuffer } from '../utils/ToArrayBuffer';
// import { clearInformation } from '../bluetooth/BluetoothDevice';
// import React, { useCallback, useEffect, useState } from 'react';
// import { Calendar, LocaleConfig } from "react-native-calendars";
// import {  
//   ActivityIndicator,
//   Modal,
//   StyleSheet,  
//   TouchableOpacity
// } from 'react-native';
// import { 
//   BluetoothManager, 
//   disconnect,  
//   useDevicesStore 
// } from '../bluetooth/BluetoothManager';
// import { Card, Portal } from 'react-native-paper';
// import { AntDesign } from '@expo/vector-icons';

// LocaleConfig.locales['br'] = {
//   monthNames: [
//     'Janeiro',
//     'Fevereiro',
//     'Março',
//     'Abril',
//     'Maio',
//     'Junho',
//     'Julho',
//     'Agosto',
//     'Setembro',
//     'Outubro',
//     'Novembro',
//     'Dezembro'
//   ],
//   monthNamesShort: ['Jan.', 'Fev.', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul.', 'Ago', 'Set.', 'Out.', 'Nov.', 'Dez.'],
//   dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
//   dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.'],
//   today: "Hoje"
// };
// LocaleConfig.defaultLocale = 'br';

// export default function TabFiveScreen({ navigation }: RootTabScreenProps<'TabFive'>) {

//   const [logs, setLogs] = useState(); 
//   const [erro, setErro] = useState('');
//   const store = useDevicesStore((state) => state);
//   const [isFocused, setIsFocused] = useState(false);
//   const [dataInicio, setDataInicio] = useState('');
//   const [diaSelecionado, setDiaSelecionado] = useState();
//   const [visibleError, setVisibleError] = useState(false);
//   const [showSelecionarDia, setShowSelecionarDia] = useState(false);


//   useFocusEffect(
//     useCallback(() => {
//       let dat = new Date()
//       var dateGMT = dat.toString().substring(0, 25)
//       var dateFormat = Moment(dateGMT, "ddd, MMM Do YYYY, hh:mm:ss").format('YYYY-MM-DD')
//       setDiaSelecionado(dateFormat)
//       listarLogs(dateFormat, dateFormat)
//       setTimeout(() => {
//         setIsFocused(true)
//       },2000);
//       return () => setIsFocused(false);
//     }, [])
//   );

//   useEffect(() => {
//     if(isFocused){
//       BluetoothManager.onStateChange((state) => {
//         const subscription = BluetoothManager.onStateChange((state) => {
//           if (state === "PoweredOff") {
//             disconnect()
//             clearInformation()
//             subscription.remove();
//             navigation.navigate('TabOne')
//           }
//         }, true);
//         return () => subscription.remove();
//       });
//     }
//   }, [BluetoothManager]);

//   const listarLogs = async(dataInicio: string, dataFim: string) =>{
    
//     await SyncService.GetRelatorio(dataInicio, dataFim)
//     .then((resp: any)=>{
//       if(resp.status != 200){
//         setVisibleError(true)
//         setErro(resp.titulo)
//       }
//       setLogs(resp.data)
//     })
   
//   };

//   function selecionarDia(day: any){
//     var select = new Date(day.dateString)
//     var test = new Date();
//     if(select <= test){
//         setShowSelecionarDia(false)
//         setDiaSelecionado(day.dateString)
//         listarLogs(day.dateString, day.dateString)
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {
//         isFocused?
//           logs?
//             <>
//               <GerarGrafico data={logs}/>
//               <Text style={styles.label}>Selecionar Dia:</Text>
//               <TouchableOpacity
//                 onPress={()=>{setShowSelecionarDia(true)}}
//                 style={{
//                   width: '90%',
//                   marginTop: 10,
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   alignSelf: 'center',
//                   height: 50,
//                   backgroundColor: 'rgba(180, 180, 180, 0.2)',
//                   borderRadius: 10
//                 }}
//               >
//                 <Text style={{fontSize: 16}}>{Moment(diaSelecionado, 'YYYY-MM-DD').format('DD/MM/YYYY')}</Text>
//               </TouchableOpacity>
//             </>
//           :
//             <>
//               <AntDesign name="areachart" size={200} color="rgba(100, 100, 100, 0.2)" />
//               <Text style={{fontSize: 16, color: "rgba(100, 100, 100, 0.4)"}}>Erro, data não encontrada</Text>
//               <Text style={[styles.label, {marginTop: 30}]}>Selecionar Dia:</Text>
//               <TouchableOpacity
//                 onPress={()=>{setShowSelecionarDia(true)}}
//                 style={{
//                   width: '90%',
//                   marginTop: 10,
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   alignSelf: 'center',
//                   height: 50,
//                   backgroundColor: 'rgba(180, 180, 180, 0.2)',
//                   borderRadius: 10
//                 }}
//               >
//                 <Text style={{fontSize: 16}}>{Moment(diaSelecionado, 'YYYY-MM-DD').format('DD/MM/YYYY')}</Text>
//               </TouchableOpacity>
//             </>
//         :
//           <ActivityIndicator color={'#286d9b'} size={150}/>
//       }
//       <Portal>
//         <Modal
//           animationType='fade'
//           visible={showSelecionarDia}
//           transparent={true}
//         >
//           <View 
//             style={{
//               backgroundColor: 'rgba(0, 0, 0, 0.2)', 
//               flex: 1, 
//               alignItems: 'center', 
//               justifyContent: 'center'
//             }}
//           >
//             <Card style={styles.card}>
//             <Calendar
//               onDayPress={(day) => {
//                 selecionarDia(day);
//               }}
//               monthFormat={'MM yyyy'}
//               hideArrows={false}
//               hideExtraDays={true}
//               disableMonthChange={false}
//               firstDay={1}
//             />
//             </Card>
//           </View>
//         </Modal>  
//       </Portal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   card: {
//     height: 350,
//     width: '80%',
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   textButtom: {
//     color: '#1d4d6e',
//     fontSize: 26,
//     fontWeight: 'bold',
//     alignItems: 'center'
//   },
//   textButtom2: {
//     color: 'white',
//     fontSize: 24,
//     fontWeight: 'bold',
//     alignItems: 'center'
//   },
//   label: {
//     // backgroundColor: 'red',
//     width: '90%',
//     fontSize: 16,
//     fontWeight: 'bold',
//     alignItems: 'center'
//   },
//   length: {
//     marginTop: 20,
//     color: 'white',
//     fontSize: 22,
//     fontWeight: 'bold',
//     alignItems: 'center'
//   },
//   roundButton1: {
//     position: 'absolute',
//     width: 250,
//     height: 250,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 10,
//     borderRadius: 250,
//     borderWidth: 5,
//     borderColor: '#2f95dc',
//   },
//   roundButton2: {
//     position: 'absolute',
//     width: 250,
//     height: 250,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 10,
//     borderRadius: 250,
//     // borderWidth: 5,
//     // borderColor: '#2f95dc',
//   },
// });
