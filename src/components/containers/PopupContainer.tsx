import React, { useEffect, useRef, useState } from 'react';
import { Animated, LayoutChangeEvent, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


interface PopupProps {
  visible: boolean;
  children: React.ReactNode;
}

export function PopupContainer({ visible, children }: PopupProps) {
  const insets = useSafeAreaInsets();
  const [parentSize, setParentSize] = useState({ width: 0, height: 0 });

  // смещение popup-а
  const translateY = useRef(new Animated.Value(0)).current;
  const hiddenPosition =  parentSize.height + insets.bottom + 40;

  const handleLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setParentSize({ width, height });
  };

  useEffect(() => {
    if (parentSize.height === 0) return;

    Animated.spring(translateY, {
      toValue: visible ? 0 : hiddenPosition,
      useNativeDriver: true,
      damping: 20,
      stiffness: 160,
    }).start();
  }, [visible, parentSize.height]);

  return (
    <View style={styles.root} onLayout={handleLayout}>
      {visible && <Pressable style={styles.backdrop} onPress={() => {}}/>}

      <Animated.View
        pointerEvents={visible ? 'auto' : 'none'}
        style={[styles.popup,
          {
            width: parentSize.width,
            transform: [{ translateY: translateY }],
            paddingBottom: insets.bottom, // учитываем SafeArea
          },
        ]}
      >
        {children}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  popup: {
    position: 'absolute',
    left: 0,
    bottom: 0, // всегда снизу, независимо от ориентации!
    backgroundColor: '#1B2A3D',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    minHeight: 120,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});
