import React, { useEffect, useRef } from 'react';
import { BackHandler, ToastAndroid, Platform } from 'react-native';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import WebViewTestScreen from './screens/WebViewTestScreen';
import {
  DefaultPaymentScreen,
  TotalPaymentScreen,
  SubscriptionScreen,
  AuthenticationScreen,
  WidgetPaymentScreen,
  CommerceScreen,
} from './screens/payments';

const Stack = createNativeStackNavigator();

const BACK_EXIT_INTERVAL_MS = 2000;

// react-navigation 화면을 onBack 패턴 화면과 연결하는 어댑터
function withOnBack<P extends { onBack: () => void }>(
  Component: React.ComponentType<P>,
) {
  return ({ navigation }: { navigation: { goBack: () => void; popToTop: () => void } }) => {
    const onBack = () => {
      if (typeof navigation.popToTop === 'function') {
        navigation.popToTop();
      } else {
        navigation.goBack();
      }
    };
    return <Component {...({ onBack } as P)} />;
  };
}

const DefaultPayment = withOnBack(DefaultPaymentScreen);
const TotalPayment = withOnBack(TotalPaymentScreen);
const Subscription = withOnBack(SubscriptionScreen);
const Authentication = withOnBack(AuthenticationScreen);
const WidgetPayment = withOnBack(WidgetPaymentScreen);
const Commerce = withOnBack(CommerceScreen);

export default function App() {
  const navigationRef = useNavigationContainerRef();
  const lastBackPressRef = useRef<number>(0);

  useEffect(() => {
    if (Platform.OS !== 'android') return;

    const onBackPress = () => {
      if (navigationRef.canGoBack()) {
        navigationRef.goBack();
        return true;
      }
      const now = Date.now();
      if (now - lastBackPressRef.current < BACK_EXIT_INTERVAL_MS) {
        BackHandler.exitApp();
        return true;
      }
      lastBackPressRef.current = now;
      ToastAndroid.show('한 번 더 누르면 종료됩니다', ToastAndroid.SHORT);
      return true;
    };

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );
    return () => subscription.remove();
  }, [navigationRef]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="DefaultPayment" component={DefaultPayment} />
        <Stack.Screen name="TotalPayment" component={TotalPayment} />
        <Stack.Screen name="Subscription" component={Subscription} />
        <Stack.Screen name="Authentication" component={Authentication} />
        <Stack.Screen name="WidgetPayment" component={WidgetPayment} />
        <Stack.Screen name="Commerce" component={Commerce} />
        <Stack.Screen
          name="WebViewTest"
          component={WebViewTestScreen}
          options={{ headerShown: true, title: '웹뷰 테스트' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
