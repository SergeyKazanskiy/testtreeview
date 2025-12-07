import { ScreenContainer } from '@/src/components/containers/ScreenContainer';
import { TabIconRenderProps } from '@/src/styles/types';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet, Text, View } from "react-native";


function getIconsData(routeName: string) {
  let iconName: any;
  let label = '';

  if (routeName === 'profile') {
    iconName = 'person-outline';
    label = 'Profile';
  }
  else if (routeName === 'achieves') {
    iconName = 'bookmark-outline';
    label = 'Achievements';
  } else {
    iconName = 'document-text-outline';
    label = 'Statistics';
  }

  return { iconName, label };
}

export default function Layout() {
  return (
    <ScreenContainer>
      <Tabs screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabbar,
          tabBarIcon: ({ focused }: TabIconRenderProps) => {
            const { iconName, label } = getIconsData(route.name);
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 8 }}>
                <Ionicons name={iconName} style={[styles.icon, focused && styles.focused]} />
                <Text style={[styles.label, focused && styles.focused]}>{label}</Text>
              </View>
            );
          }
        })}
      >
        <Tabs.Screen name="profile" />
        <Tabs.Screen name="achieves" /> 
        <Tabs.Screen name="statistics" />
      </Tabs>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: '#0C1B30',
    height: 70,
    borderTopWidth: 0,
    paddingTop: 12,
  },
  label: {
    color: '#888888',
    fontSize: 14,
    marginTop: 3
  },
  focused: {
    color: '#E4FF3E'
  },
    icon: {
    color: '#888888',
    fontSize: 24,
  },
  image: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: '72%',
    height: '30%',
  },
})