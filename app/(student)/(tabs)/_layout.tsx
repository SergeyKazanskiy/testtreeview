import { ScreenContainer } from '@/src/components/containers/ScreenContainer';
import { IconPair, TabIconRenderProps } from '@/src/styles/types';
import { Tabs } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, View } from "react-native";


const ICONS: Record<string, IconPair> = {
  games: {
    active: require('@/assets/images/icons/TabIcons/game-selected.png'),
    inactive: require('@/assets/images/icons/TabIcons/game.png'),
  },
  leaders: {
    active: require('@/assets/images/icons/TabIcons/leaderboard-selected.png'),
    inactive: require('@/assets/images/icons/TabIcons/leaderboard.png'),
  },
  home: {
    active: require('@/assets/images/icons/TabIcons/home-selected.png'),
    inactive: require('@/assets/images/icons/TabIcons/home.png'),
  },
  achieves: {
    active: require('@/assets/images/icons/TabIcons/achievements-selected.png'),
    inactive: require('@/assets/images/icons/TabIcons/achievements.png'),
  },
  statistics: {
    active: require('@/assets/images/icons/TabIcons/stats-selected.png'),
    inactive: require('@/assets/images/icons/TabIcons/stats.png'),
  },
};

export default function Layout() {

  const createIcon = (icons: IconPair) => ({ focused }: TabIconRenderProps) => (
    <View style={focused && styles.icon_focused}>
      <Image source={focused ? icons.active : icons.inactive} style={styles.icon} />
    </View>
  );

  return (
    <ScreenContainer>
      <Tabs screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarSafeAreaInset: { bottom: 'never', top: 'never' },
          tabBarStyle: styles.tabbar,
          tabBarIcon: createIcon(ICONS[route.name]),
        })}
      >
        <Tabs.Screen name="games" />
        <Tabs.Screen name="leaders" /> 
        <Tabs.Screen name="home" />
        <Tabs.Screen name="achieves" />
        <Tabs.Screen name="statistics" /> 
      </Tabs>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    borderTopWidth: 0,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 54,
    backgroundColor: '#D8F207',
    borderRadius: 26,
    paddingHorizontal: 4,
    marginHorizontal: 14,
    marginBottom: 8
  },
  icon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
  icon_focused: {
    justifyContent: 'center',
    backgroundColor: '#161D21',
    borderRadius: 45,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
})