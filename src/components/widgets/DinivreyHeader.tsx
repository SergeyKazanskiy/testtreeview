import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';


interface Props {
  title: string;
  onExit: () => void;
}

export const DinivreyHeader: React.FC<Props> = ({ title, onExit }) => {
  return (
    <View style={styles.container}>
      <Image style={[styles.image]}
        source={require('../../../assets/images/Logo.png')} /> 
      <Text style={styles.title}>{title}</Text>
      <Ionicons name='exit-outline' style={[styles.icon]}
        onPress={onExit}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    justifyContent: 'space-around',
    backgroundColor: '#152B52', //'#152B52' '#E4FF3E'
    height: 60,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingTop: 10
  },
  image: {
    height: 48,
    width: 36,
},
  title: {
    fontWeight: '600',
    fontSize: 22,
    color: '#E4FF3E',//#D1FF4D, c2ff00
    paddingTop: 8
  },
  icon: {
    paddingTop: 4,
    fontSize: 22,
    color: '#E4FF3E'
  },
});

