import { Icon } from '@/src/components/icons/CustomIcon';
import React, { useState } from 'react';
import { Modal, Platform, StyleSheet, Text, View } from 'react-native';


interface Props {
  visible: boolean;
  children: React.ReactNode;
  title: string;
  onClose: () => void;
}

export function PopupContainer({ visible, children, title, onClose }: Props) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  if (!visible) return null;

  return (
    <Modal visible transparent animationType="fade">
      <View
        style={styles.fullscreen}
        onLayout={(e) => {
          const { width, height } = e.nativeEvent.layout;
          setSize({ width, height });
        }}
      >
        <View style={{ width: size.width, height: size.height }}>
          <View style={styles.header}>
            <Text style={styles.title}>  </Text>
            <Text style={styles.title}>{title}</Text>
            <Icon size={20} color="#D1FF4D" name="close" onPress={onClose} />
          </View>

          {children}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    //...StyleSheet.absoluteFillObject,
    flex: 1,
    width: Platform.OS === 'web' ? 360 : '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    padding: 20,
    backgroundColor: '#152B52',
  },
  title: {
    color: '#D1FF4D',
    fontSize: 20,
    fontWeight: '400',
  },
});
