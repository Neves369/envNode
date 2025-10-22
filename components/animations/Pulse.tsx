import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import splashW from '../../assets/images/pulse.json';

const Pulse: React.FC = () => {
  return (
    <View
      style={{
        width: 500,
        height: 500,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <LottieView source={splashW} autoPlay loop style={{ width: '100%', height: '100%' }} />
    </View>
  );
};

export default Pulse;
