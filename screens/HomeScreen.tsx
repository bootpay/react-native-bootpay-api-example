import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  DefaultPayment: undefined;
  TotalPayment: undefined;
  Subscription: undefined;
  Authentication: undefined;
  WidgetPayment: undefined;
  Commerce: undefined;
  WebViewTest: undefined;
};

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

interface MenuItem {
  number: number;
  title: string;
  route: keyof RootStackParamList;
}

const MENU_ITEMS: MenuItem[] = [
  { number: 1, title: 'PG 일반 결제 테스트', route: 'DefaultPayment' },
  { number: 2, title: '통합결제 테스트', route: 'TotalPayment' },
  { number: 3, title: '카드자동 결제 테스트 (인증)', route: 'Subscription' },
  { number: 4, title: '본인인증 테스트', route: 'Authentication' },
  { number: 5, title: '위젯 결제 테스트', route: 'WidgetPayment' },
  { number: 6, title: 'Commerce 결제 테스트', route: 'Commerce' },
  { number: 7, title: '웹뷰 테스트', route: 'WebViewTest' },
];

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.title}>Bootpay 결제 테스트</Text>
        <Text style={styles.subtitle}>테스트할 결제 방식을 선택하세요</Text>
      </View>

      <ScrollView style={styles.menuList} contentContainerStyle={styles.menuListContent}>
        {MENU_ITEMS.map((item) => (
          <TouchableOpacity
            key={item.route}
            style={styles.menuButton}
            onPress={() => navigation.navigate(item.route as never)}
          >
            <Text style={styles.menuButtonText}>
              {item.number}. {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerSection: {
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  menuList: {
    flex: 1,
  },
  menuListContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  menuButton: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    marginBottom: 12,
  },
  menuButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});
