import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";
import splashW from '~/assets/images/pulse.json';

const Pulse: React.FC = () => {
  return (
    <View 
      style = {{ 
        width: 500,
        height: 500,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red'
      }}
      >
        <LottieView 
          source={splashW} 
          autoPlay 
          loop 
          resizeMode='contain'
          
        />
    </View>
  );
};

export default Pulse;
