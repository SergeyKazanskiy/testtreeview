import { useAuthStore } from '@/src/api/store';
import { ScreenContainer } from '@/src/components/containers/ScreenContainer';
import { DinivreyHeader } from '@/src/components/widgets/DinivreyHeader';
import { TabIconRenderProps } from '@/src/styles/types';
import { Ionicons } from '@expo/vector-icons';
import { router, Tabs } from 'expo-router';
import { Image, StyleSheet, Text, View } from "react-native";


function getIconsData(routeName: string) {
  let iconName: any;
  let label = '';

  if (routeName === 'profile') {
    iconName = 'people';
    label = 'Profile';
  }
  else if (routeName === 'achieves') {
    iconName = 'people';
    label = 'Achievements';
  } else {
    iconName = 'calendar-number-outline';
    label = 'Events';
  }

  return { iconName, label };
}

export default function Layout() {
  const { logoutUser } = useAuthStore();
  
  return (
    <ScreenContainer>
      <DinivreyHeader title='Coach' onExit={()=>(router.replace('/'), logoutUser())}/>
      <Image style={[styles.image]} source={require('../../../assets/images/DinivreyCompany.png')} />

      <Tabs screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabbar,
          tabBarIcon: ({ focused }: TabIconRenderProps) => {
            const { iconName, label } = getIconsData(route.name);
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name={iconName} style={[styles.icon, focused && styles.focused]} />
                <Text style={[styles.label, focused && styles.focused]}>{label}</Text>
              </View>
            );
          }
        })}
      >
        <Tabs.Screen name="profile" />
        <Tabs.Screen name="achieves" /> 
        <Tabs.Screen name="events" />
      </Tabs>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    position: 'absolute',
    bottom: 11,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 54,
    backgroundColor: '#D8F207',
    borderRadius: 26,
    marginHorizontal: 14,
    borderTopWidth: 0,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    paddingHorizontal: 4,
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