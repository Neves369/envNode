import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";
import splashW from '~/assets/images/sync.json';

const Sync: React.FC = () => {
  return (
    <View 
      style = {{ 
        width: 550,
        height: 550,
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

export default Sync;
