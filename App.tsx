import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import BootpayTestScreen from './screens/BootpayTestScreen';
import WebViewTestScreen from './screens/WebViewTestScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: '테스트 선택' }} />
        <Stack.Screen name="BootpayTest" component={BootpayTestScreen} options={{ title: '부트페이 테스트' }} />
        <Stack.Screen name="WebViewTest" component={WebViewTestScreen} options={{ title: '웹뷰 테스트' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
