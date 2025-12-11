import { BACKEND_APP_IMAGES_URL } from '@/src/api/api';
import { AchieveGradientColors, RuleLevels } from '@/src/constants/constants';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, ImageBackground, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';


interface AchieveIconProps {
  image: string;
  label: string;
  level: number;
  percent: number;
}

export const AchieveIcon: React.FC<AchieveIconProps> = ({ image, label, level, percent }) => {
  const frameSrc: ImageSourcePropType = { uri: `${BACKEND_APP_IMAGES_URL}/achieves/frames/${RuleLevels[level - 1]}.png` };
  const pngSrc: ImageSourcePropType = { uri: `${BACKEND_APP_IMAGES_URL}/achieves/images/${image}.png` };
  const bgSrc = require('../../../../../assets/images/BackAchieve.png');

  const colors = AchieveGradientColors[level - 1];
  const frameSize = 64;
  const iconSize = frameSize * 0.75;

  return (
    <ImageBackground source={bgSrc} style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.innerContainer}>
        <Image source={frameSrc}
          style={[ styles.frameImage,{ width: frameSize, height: frameSize }]}
          resizeMode="cover"
        />
        <Image source={pngSrc}
          style={[ styles.iconImage,
              { width: iconSize, height: iconSize, top: (frameSize - iconSize) / 2, marginLeft: -(iconSize / 2) } ]}
          resizeMode="cover"
        />
      </View>

      <LinearGradient
        colors={[colors[1], '#222']}
        start={{ x: 0, y: 0 }}
        end={{ x: percent, y: 0 }}
        locations={[percent, percent + 0.2]}
        style={[styles.progress, { borderColor: colors[0] }]}
      >
        <Text style={[ styles.percent, { color: level > 1 ? '#fff' : percent === 0 ? '#ddd' : '#222' }]}>
          {percent * 100}%
        </Text>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 'auto',
    paddingHorizontal: 10
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  frameImage: {
    borderRadius: 9999, // for circle
  },
  iconImage: {
    position: 'absolute',
    left: '50%',
    borderRadius: 9999, //  for circle
  },
  label: {
    fontSize: 10,
    fontWeight: '800',
    color: '#bbb',
    textAlign: 'center',
    marginVertical: 4,
  },
  progress: {
    height: 20,
    marginVertical: 6,
    borderRadius: 10,
    borderWidth: 2,
    paddingHorizontal: 6,
    justifyContent: 'center',
  },
  percent: {
    fontSize: 13,
    textAlign: 'center',
  },
});
