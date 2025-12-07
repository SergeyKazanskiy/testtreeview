import { Button } from '@/src/components/buttons/CustomButton';
import React, { useRef } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import SignatureCanvas, { SignatureViewRef } from 'react-native-signature-canvas';
import { useStore } from '../../store';


export const SignatureView = () => {
  const { saveSignature } = useStore();
  const signatureRef = useRef<SignatureViewRef>(null);

  // Save callback for mobile
  const handleOK = (sig: string) => {
    saveSignature(sig); // sig is already Base64
  };

  // Clear callback
  const handleClear = () => {
    signatureRef.current?.clearSignature();
    saveSignature(null);
  };

  // === WEB STUB ===
  if (Platform.OS === 'web') {
    return (
      <View style={styles.webStub}>
        <Text style={{ fontSize: 16, textAlign: 'center' }}>
          Подпись не поддерживается в веб-версии.
        </Text>
      </View>
    );
  }

  // === MOBILE ===
  return (
    <View style={styles.container}>
      <SignatureCanvas
        ref={signatureRef}
        onOK={handleOK}
        onClear={handleClear}
        autoClear={false}
        descriptionText="Подпишите здесь"
        clearText="Очистить"
        confirmText="Сохранить"
        webStyle={STYLES_FOR_WEBVIEW}
      />

      <View style={styles.section}>
        <Button 
          title="Сохранить"
          type="outline"
          onPress={() => signatureRef.current?.readSignature()}
          buttonStyle={styles.button}
        />
        <Button 
          title="Очистить"
          type="outline"
          onPress={handleClear}
          buttonStyle={styles.button}
        />
      </View>
    </View>
  );
};

const STYLES_FOR_WEBVIEW = `
  .m-signature-pad--footer { display: none; }
  body,html {
    width: 100%;
    height: 100%;
    margin: 0;
  }
  canvas {
    width: 100% !important;
    height: 100% !important;
  }
`;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  preview: {
    width: 120,
    height: 40,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 28,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginHorizontal: 4
  },
  title: {
    fontSize: 16,
    color: 'gold'
  },
  webStub: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
