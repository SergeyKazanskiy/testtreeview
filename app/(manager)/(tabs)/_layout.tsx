import { useAuthStore } from '@/src/api/store';
import { ScreenContainer } from '@/src/components/containers/ScreenContainer';
import { DinivreyHeader } from '@/src/components/widgets/DinivreyHeader';
import { TabIconRenderProps } from '@/src/styles/types';
import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { Image, StyleSheet, Text, View } from "react-native";


function getIconsData(routeName: string) {
  let iconName: any;
  let label = '';

if (routeName === 'groups') {
    iconName = 'people';
    label = 'Groups';
  } else if (routeName === 'coaches') {
    iconName = 'person';
    label = 'Coaches';
  } else {
    iconName = 'calendar-number-outline';
    label = 'Events';
  }
  return { iconName, label };
}

export default function Layout() {
  const { logoutUser } = useAuthStore();
  const router = useRouter();

  return (
    <ScreenContainer>
      <DinivreyHeader title='Manager' onExit={()=>(router.replace('/'), logoutUser())}/>
      <Image style={[styles.image]} source={require('@/assets/images/DinivreyCompany.png')} />
      
      <Tabs screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabbar,
          tabBarIcon: ({ focused }: TabIconRenderProps) => {
            const { iconName, label } = getIconsData(route.name);
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center', width: 160}}>
                <Ionicons name={iconName} style={[styles.icon, focused && styles.focused]} />
                <Text style={[styles.label, focused && styles.focused]}>{label}</Text>
              </View>
            );
          }
        })}
      >
        <Tabs.Screen name="groups" />
        <Tabs.Screen name="coaches" />
        <Tabs.Screen name="camps" />
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
    fontSize: 12,
  },
  focused: {
    color: '#E4FF3E'
  },
  icon: {
    marginTop: 4,
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