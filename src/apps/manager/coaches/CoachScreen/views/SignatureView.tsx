import { Button } from '@/src/components/buttons/CustomButton';
import React, { useRef } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import SignatureCanvas, { SignatureViewRef } from 'react-native-signature-canvas';
import { useStore } from '../../store';


export const SignatureView = () => {
  const { saveSignature } = useStore();
  const signatureRef = useRef<SignatureViewRef>(null);

  const handleOK = (sig: string) => {
    saveSignature(sig); // Base64
  };

  const handleClear = () => {
    signatureRef.current?.clearSignature();
    saveSignature(null);
  };

  // === WEB STUB ===
  if (Platform.OS === 'web') {
    return (
      <View style={styles.webStub}>
        <Text style={{ fontSize: 16, textAlign: 'center' }}>
          Signature is not supported in web version.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.signatureBox}>
        <SignatureCanvas
          ref={signatureRef}
          onOK={handleOK}
          onClear={handleClear}
          autoClear={false}
          descriptionText="Sign here"
          clearText="Clear"
          confirmText="Save"
          webStyle={WEBVIEW_STYLES}
        />
      </View>

      <View style={styles.section}>
        <Button
          title="Save"
          type="outline"
          onPress={() => signatureRef.current?.readSignature()}
          buttonStyle={styles.button}
        />

        <Button
          title="Clear"
          type="outline"
          onPress={handleClear}
          buttonStyle={styles.button}
        />
      </View>
    </View>
  );
};

const WEBVIEW_STYLES = `
  body,html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  /* The main signature container */
  .m-signature-pad {
    height: 100% !important;
  }

  .m-signature-pad--body {
    border: 1px solid #ccc !important;
  }

  /* Show footer again */
  .m-signature-pad--footer {
    display: flex !important;
    flex-direction: column;
    justify-content: center !important;
    align-items: center !important;
    height: 40px !important;
  }

  /* Hide internal buttons but keep text */
  .m-signature-pad--footer .button {
    display: none !important;
  }

  /* Make description text visible */
  .m-signature-pad--description {
    font-size: 16px !important;
    color: #555 !important;
    margin-bottom: 5px !important;
  }

  canvas {
    width: 100% !important;
    height: calc(100% - 40px) !important;
  }
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  // Fixed 200 height box for signature
  signatureBox: {
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
  },

  section: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },

  button: {
    height: 32,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginHorizontal: 4,
  },

  webStub: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
