import React, { useRef, useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {
  BootpayWidget,
  WidgetPayload,
  WidgetData,
} from 'react-native-bootpay-api';
import {
  ANDROID_APPLICATION_ID,
  CLIENT_KEY,
  IOS_APPLICATION_ID,
} from '../utils/BootpayConfig';

const ORDER_NAME = '테스트 상품';
const PRICE = 1000;

export default function BootpayWidgetScreen() {
  const bootpayWidget = useRef<BootpayWidget>(null);

  const [widgetHeight, setWidgetHeight] = useState(200);
  const [widgetData, setWidgetData] = useState<WidgetData | null>(null);
  const [widgetTop, setWidgetTop] = useState(0);

  const widgetPlaceholderRef = useRef<View>(null);

  const formatPrice = (price: number) => `${price.toLocaleString()}원`;

  const getWidgetPayload = useCallback((): WidgetPayload => {
    return {
      widget_key: 'default-widget',
      widget_sandbox: true,
      widget_use_terms: true,
      order_name: ORDER_NAME,
      price: PRICE,
      order_id: `order_${Date.now()}`,
      extra: {
        app_scheme: 'bootpayrnapi',
        separately_confirmed: true,
        display_success_result: true,
        display_error_result: true,
        show_close_button: false,
      },
    };
  }, []);

  const measureWidgetPosition = useCallback(() => {
    if (widgetPlaceholderRef.current) {
      widgetPlaceholderRef.current.measureInWindow((_x, y, _width, _height) => {
        console.log('[Widget] measureInWindow y:', y);
        if (y > 0) {
          setWidgetTop(y);
        }
      });
    }
  }, []);

  const onWidgetLayout = useCallback(() => {
    setTimeout(measureWidgetPosition, 300);
  }, [measureWidgetPosition]);

  const onWidgetReady = useCallback(() => {
    console.log('[Widget] ===== READY =====');
    // 위젯 ready 시점에 다시 한번 위치 측정
    setTimeout(measureWidgetPosition, 200);
    const payload = getWidgetPayload();
    bootpayWidget.current?.renderWidget(payload);
  }, [getWidgetPayload, measureWidgetPosition]);

  const onWidgetResize = useCallback((height: number) => {
    console.log('[Widget] ===== RESIZE:', height);
    setWidgetHeight(height);
    // 리사이즈 후 위치 재측정
    setTimeout(measureWidgetPosition, 100);
  }, [measureWidgetPosition]);

  const onWidgetChangePayment = useCallback((data: WidgetData | null) => {
    console.log('[Widget] ===== CHANGE PAYMENT =====');
    setWidgetData(data);
  }, []);

  const onWidgetChangeTerms = useCallback((data: WidgetData | null) => {
    console.log('[Widget] ===== CHANGE TERMS =====');
    setWidgetData(data);
  }, []);

  const onCancel = useCallback((data: unknown) => {
    console.log('[Widget] onCancel:', data);
  }, []);

  const onError = useCallback((data: unknown) => {
    console.log('[Widget] onError:', data);
    const errorData = data as { message?: string };
    Alert.alert('결제 오류', errorData?.message || '결제 중 오류가 발생했습니다.');
  }, []);

  const onIssued = useCallback((data: unknown) => {
    console.log('[Widget] onIssued:', data);
    Alert.alert('가상계좌 발급', '가상계좌가 발급되었습니다.');
  }, []);

  const onConfirm = useCallback((data: unknown) => {
    console.log('[Widget] onConfirm:', data);
    bootpayWidget.current?.transactionConfirm();
    return true;
  }, []);

  const onDone = useCallback((data: unknown) => {
    console.log('[Widget] onDone:', data);
    Alert.alert('결제 완료', '결제가 성공적으로 완료되었습니다.');
  }, []);

  const onClose = useCallback(() => {
    console.log('[Widget] onClose');
  }, []);

  const isCompleted =
    (widgetData?.term_passed ?? false) && (widgetData?.completed ?? false);

  const goPayment = useCallback(() => {
    if (!isCompleted) {
      Alert.alert('알림', '결제수단 선택과 약관동의를 완료해주세요.');
      return;
    }
    console.log('[Widget] ===== Go Payment =====');
    bootpayWidget.current?.requestPayment();
  }, [isCompleted]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* 상품 정보 (간략하게) */}
        <View style={styles.productSection}>
          <Text style={styles.productInfo}>
            {ORDER_NAME} - {formatPrice(PRICE)}
          </Text>
        </View>

        {/* Widget placeholder */}
        <View
          ref={widgetPlaceholderRef}
          style={[styles.widgetWrapper, { minHeight: widgetHeight }]}
          onLayout={onWidgetLayout}
        />
      </ScrollView>

      {/* 결제 버튼 */}
      <View style={styles.payButtonContainer}>
        <TouchableOpacity
          style={[styles.payButton, !isCompleted && styles.payButtonDisabled]}
          onPress={goPayment}
          disabled={!isCompleted}
        >
          <Text style={styles.payButtonText}>
            {formatPrice(PRICE)} 결제하기
          </Text>
        </TouchableOpacity>
      </View>

      {/* BootpayWidget */}
      <BootpayWidget
        ref={bootpayWidget}
        ios_application_id={IOS_APPLICATION_ID}
        android_application_id={ANDROID_APPLICATION_ID}
        client_key={CLIENT_KEY}
        height={widgetHeight}
        widgetTop={widgetTop}
        onWidgetReady={onWidgetReady}
        onWidgetResize={onWidgetResize}
        onWidgetChangePayment={onWidgetChangePayment}
        onWidgetChangeTerms={onWidgetChangeTerms}
        onCancel={onCancel}
        onError={onError}
        onIssued={onIssued}
        onConfirm={onConfirm}
        onDone={onDone}
        onClose={onClose}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  productSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  productInfo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  widgetWrapper: {
    backgroundColor: '#fff',
  },
  payButtonContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  payButton: {
    backgroundColor: '#3182f6',
    borderRadius: 10,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payButtonDisabled: {
    backgroundColor: '#ccc',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
