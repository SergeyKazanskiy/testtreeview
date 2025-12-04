import { ScreenContainer } from '@/src/components/containers/ScreenContainer';
import { Text } from 'react-native';


interface Props {
  pressTest: () => void;
  pressGame: () => void;
}
  
export default function Index({pressTest, pressGame}: Props) {
  return (
    <ScreenContainer>
      <Text >AttendanceScreen</Text>
      <Text onPress={pressTest}>TestScreen</Text>
      <Text onPress={pressGame}>GameScreen</Text>
    </ScreenContainer>
  );
}
