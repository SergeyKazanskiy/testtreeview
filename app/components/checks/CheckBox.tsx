import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleProp, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';


interface Props {
  checked: boolean;
  onPress?: () => void;
  checkedIcon?: string;
  uncheckedIcon?: string;
  checkedColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  size?: number;
  title?: string;
}

export const CheckBox: React.FC<Props> = ({
  checked,
  onPress,
  checkedIcon = 'checkbox-outline',
  uncheckedIcon = 'checkbox-blank-outline',
  checkedColor = '#007AFF',
  containerStyle,
  textStyle,
  size = 24,
  title,
}) => {
  const IconComponent = MaterialCommunityIcons;

  return (
    <TouchableOpacity
      onPress={(e) => {
        e.stopPropagation();
        onPress?.();
      }}
      style={[{ flexDirection: 'row', alignItems: 'center' }, containerStyle]}
    >
      <IconComponent
        name={checked ? (checkedIcon as any) : (uncheckedIcon as any)}
        size={size}
        color={checked ? checkedColor : '#777'}
      />
      {title ? (
        <Text style={[{ marginLeft: 8, color: checked ? checkedColor : '#000' }, textStyle]}>
          {title}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};

