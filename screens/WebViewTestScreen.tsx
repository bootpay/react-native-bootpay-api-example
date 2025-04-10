// screens/WebViewTestScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import BootpayWebView from 'react-native-webview-bootpay';

export default function WebViewTestScreen() {
  return (
    <View style={styles.container}>
      <BootpayWebView 
        style={styles.webView}
        source={{ uri: 'https://bootpay.co.kr' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
});