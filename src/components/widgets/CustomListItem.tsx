import React, { ReactNode, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

interface ListItemProps {
  children?: ReactNode;
  containerStyle?: ViewStyle;
  bottomDivider?: boolean;
  onPress?: () => void;
}

interface ListItemContentProps {
  children?: ReactNode;
  style?: ViewStyle;
}

interface ListItemTitleProps {
  children?: ReactNode;
  style?: TextStyle;
}

interface ListItemSubtitleProps {
  children?: ReactNode;
  style?: TextStyle;
}

interface ListItemAccordionProps {
  containerStyle?: ViewStyle;
  content: ReactNode;
  isExpanded?: boolean;
  onPress?: () => void;
  children?: ReactNode;
  icon?: {
    name?: string;
    color?: string;
    size?: number;
  };
}

export const ListItem = ({
  children,
  containerStyle,
  bottomDivider,
  onPress,
}: ListItemProps) => {
  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.7 : 1}
      onPress={onPress}
      style={[
        styles.itemContainer,
        containerStyle,
        bottomDivider && styles.bottomDivider,
      ]}
    >
      {children}
    </TouchableOpacity>
  );
};

ListItem.Content = ({ children, style }: ListItemContentProps) => (
  <View style={[styles.content, style]}>{children}</View>
);

ListItem.Title = ({ children, style }: ListItemTitleProps) => (
  <Text style={[styles.title, style]}>{children}</Text>
);

ListItem.Subtitle = ({ children, style }: ListItemSubtitleProps) => (
  <Text style={[styles.subtitle, style]}>{children}</Text>
);

ListItem.Accordion = ({
  containerStyle,
  content,
  isExpanded = false,
  onPress,
  children,
  icon,
}: ListItemAccordionProps) => {
  const [expanded, setExpanded] = useState(isExpanded);

  const handlePress = () => {
    setExpanded(!expanded);
    onPress?.();
  };

  return (
    <View style={ containerStyle }>
      <TouchableOpacity onPress={handlePress} style={styles.accordionHeader}>
        {content}
      </TouchableOpacity>

      {expanded && <View style={styles.accordionContent}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 12,
    borderRadius: 48,
  },
  bottomDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#444',
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    color: '#aaa',
    fontSize: 13,
    marginTop: 2,
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  accordionContent: {
  //  paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'transparent',
  },
});
