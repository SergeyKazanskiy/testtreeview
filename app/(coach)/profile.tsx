import { useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';
import { ScreenContainer } from '../components/containers/ScreenContainer';


export default function ProfileScreen() {
  const router = useRouter();

  return (
    <ScreenContainer>
      <View style={{flex: 1,  flexDirection: 'column', alignItems: 'center'}}>
        <Text style={{ fontSize: 20, marginBottom: 20 }}>👤 Профиль</Text>
        <Button
          title="Перейти на экран деталей (тот же)"
          onPress={() => router.push('../screens/DetailsScreen')}
        />
      </View>
    </ScreenContainer>
  );
}
