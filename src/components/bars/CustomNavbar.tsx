import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export type Props = {
  title: string;
  onClick: () => void;
  children?: React.ReactNode;
};
  
export const CustomNavbar: React.FC<Props> = ({ title, onClick, children }) => {
  return (
    <View style={styles.container}>
        <Ionicons name='chevron-back' size={20} color='#D1FF4D' style={styles.backIcons}
          onPress={onClick}
        />
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View  style={styles.iconsWrapper}>
          {children}
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    position: 'relative',
    backgroundColor: '#152B52',
    justifyContent: 'space-around',
    paddingVertical: 16,
    paddingHorizontal: 32,
    height: 64
  },
  backIcons: {
  //  position: 'absolute',
    top: 14,
  },
  titleWrapper: {
  //  position: 'absolute',
    top: 2,
    left: 12,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none', // чтобы не блокировать нажатия на иконки
  },
  iconsWrapper: {
  //  position: 'absolute',
    top: 8,
    //right: 16,
    flexDirection: 'row',
    alignItems: 'center',
   // gap: 26, // если используешь RN >= 0.71
  },
  center: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontWeight: '400',
    fontSize: 20,
    color: '#D1FF4D',
  },
});

