import React, { useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';


interface Props {
  visible: boolean;
  children: React.ReactNode;
}

export function PopupContainer({ visible, children }: Props) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  if (!visible) return null; // как Modal visible={false}

  return (
    <Modal visible transparent animationType="none">
      <View
        style={styles.fullscreen}
        onLayout={(e) => {
          const { width, height } = e.nativeEvent.layout;
          setSize({ width, height });
        }}
      >
        <View style={{ width: size.width, height: size.height }}>
          {children}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    ...StyleSheet.absoluteFillObject,
  },
});
