import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Platform,
  Keyboard,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import Animated, {
  Easing,
  withTiming,
  interpolate,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { useAuth } from '~/context/auth';
import { StatusBar } from 'expo-status-bar';
import Svg, { Image, Circle, ClipPath } from 'react-native-svg';
import { Gesture, GestureDetector, TextInput } from 'react-native-gesture-handler';

const { height, width } = Dimensions.get('window');

const ANIMATION_CONFIG = {
  duration: 2000,
  easing: Easing.inOut(Easing.ease),
};

const Login = () => {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const logoOpacity = useSharedValue(0);
  const buttonOpacity = useSharedValue(1);
  const inputOpacity = useSharedValue(0);
  const bgKeyboardY = useSharedValue(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', (e) => {
      'worklet';
      logoOpacity.value = withTiming(0, { duration: 100, easing: Easing.inOut(Easing.ease) });
      bgKeyboardY.value = withTiming(e.endCoordinates.height, ANIMATION_CONFIG);
      inputOpacity.value = withTiming(0, { duration: 0 });
      setTimeout(() => {
        inputOpacity.value = withTiming(1, { duration: 1000 });
      }, 2000);
    });

    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      'worklet';
      bgKeyboardY.value = withTiming(0, ANIMATION_CONFIG);
      inputOpacity.value = withTiming(0, { duration: 0 });
      setTimeout(() => {
        inputOpacity.value = withTiming(1, { duration: 1000 });
      }, 2000);

      if (inputOpacity.value === 1) {
        logoOpacity.value = withTiming(1, ANIMATION_CONFIG);
      }
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const tapGesture = Gesture.Tap().onStart(() => {
    'worklet';
    if (buttonOpacity.value === 1) {
      buttonOpacity.value = withTiming(0, ANIMATION_CONFIG);
      inputOpacity.value = withTiming(1, ANIMATION_CONFIG);
      logoOpacity.value = withTiming(1, ANIMATION_CONFIG);
    } else {
      inputOpacity.value = withTiming(0, ANIMATION_CONFIG);
      buttonOpacity.value = withTiming(1, ANIMATION_CONFIG);
      logoOpacity.value = withTiming(0, ANIMATION_CONFIG);
    }
  });

  const bgAnimatedStyle = useAnimatedStyle(() => {
    const bgY_button = interpolate(buttonOpacity.value, [0, 1], [-height / 3 - 20, 0]);
    const totalBgY = bgY_button - bgKeyboardY.value;

    return {
      transform: [{ translateY: totalBgY }],
    };
  });

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    const buttonY = interpolate(buttonOpacity.value, [0, 1], [100, 0]);
    return {
      opacity: buttonOpacity.value,
      transform: [{ translateY: buttonY }],
    };
  });

  const textInputAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: inputOpacity.value,
      zIndex: buttonOpacity.value === 0 ? 1 : -1,
    };
  });

  const logoAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: logoOpacity.value,
    };
  });

  const submit = () => {
    setLoading(true);
    setTimeout(() => {
      signIn({ email: email, senha: senha, nome: 'Douglas Neves' });
      router.replace('/(tabs)');
      setLoading(false);
    }, 3000);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-end',
      }}>
      <StatusBar style="light" />

      <Animated.View style={[StyleSheet.absoluteFill, bgAnimatedStyle]}>
        <Svg height={height} width={width}>
          <ClipPath id="clip">
            <Circle r={height} cx={width} />
          </ClipPath>
          <Image
            width={width}
            height={height}
            clipPath="url(#clip)"
            preserveAspectRatio="xMidYMid slice"
            href={require('../assets/images/bg.jpg')}
          />
        </Svg>
      </Animated.View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ width: '100%' }}
        keyboardVerticalOffset={0}>
        <View style={{ height: height / 3, justifyContent: 'center' }}>
          <GestureDetector gesture={tapGesture}>
            <Animated.View style={[styles.button, buttonAnimatedStyle]}>
              <Text style={styles.textButton}>ENTRAR</Text>
            </Animated.View>
          </GestureDetector>

          <Animated.View
            style={[styles.button, { backgroundColor: '#2E71DC' }, buttonAnimatedStyle]}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
              ENTRAR COM GOOGLE
            </Text>
          </Animated.View>

          <Animated.View
            style={[
              textInputAnimatedStyle,
              {
                top: null,
                height: height / 3,
                justifyContent: 'center',
              },
              StyleSheet.absoluteFill,
            ]}>
            <GestureDetector gesture={tapGesture}>
              <Animated.View style={styles.closeButton}>
                <Animated.Text style={styles.closeButtonText}>X</Animated.Text>
              </Animated.View>
            </GestureDetector>
            <TextInput
              value={email}
              placeholder="Email"
              autoCapitalize="none"
              onChangeText={setEmail}
              style={styles.textInput}
              placeholderTextColor="#438a60"
              keyboardType="email-address"
            />
            <TextInput
              value={senha}
              placeholder="Senha"
              autoCapitalize="none"
              onChangeText={setSenha}
              secureTextEntry={true}
              style={styles.textInput}
              placeholderTextColor="#438a60"
            />
            <Animated.View style={[styles.button]}>
              {!loading ? (
                <Text onPress={submit} style={styles.textButton}>
                  ENTRAR
                </Text>
              ) : (
                <ActivityIndicator size="large" color="#438a60" />
              )}
            </Animated.View>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>

      <Animated.Image
        width={200}
        height={200}
        style={[
          logoAnimatedStyle,
          {
            top: 200,
            width: 200,
            height: 200,
            alignSelf: 'center',
            position: 'absolute',
          },
        ]}
        source={require('../assets/images/logo-01.png')}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  button: {
    height: 70,
    borderRadius: 35,
    marginVertical: 5,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  textButton: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#438a60',
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 25,
    marginVertical: 5,
    color: '#438a60',
    marginHorizontal: 20,
    borderColor: '#53886983',
    backgroundColor: 'white',
  },
  closeButton: {
    top: -50,
    width: 60,
    height: 60,
    elevation: 5,
    borderRadius: 30,
    shadowOpacity: 0.2,
    left: width / 2 - 30,
    position: 'absolute',
    alignItems: 'center',
    shadowColor: 'black',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke',
    shadowOffset: { height: 2, width: 2 },
  },
  closeButtonText: {
    fontSize: 15,
    color: '#7e0707',
  },
});
