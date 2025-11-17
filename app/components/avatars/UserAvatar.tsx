import React from 'react';
import { Image, ImageStyle, StyleProp, View, ViewStyle } from 'react-native';
import avatars, { AvatarName } from '../../constants/avatars';


interface Props {
  name: AvatarName;
  size: number;
  rounded?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

export function UserAvatar({ name, size, rounded = false, containerStyle }: Props) {
  const source = avatars[name] ?? avatars.stab_avatar;

  const avatarStyle: StyleProp<ImageStyle> = {
    width: size,
    height: size,
    borderRadius: rounded ? size / 2 : 0,
  };

  return (
    <View style={containerStyle}>
      <Image source={source} style={avatarStyle} resizeMode="cover" />
    </View>
  );
}
