import { ScreenContainer } from '@/src/components/containers/ScreenContainer';
import { Text } from 'react-native';


interface Props {
  onTest: () => void;
  onGame: () => void;
}
  
export default function Index({onTest, onGame}: Props) {
  return (
    <ScreenContainer>
      <Text >AttendanceScreen</Text>
      <Text onPress={onTest}>TestScreen</Text>
      <Text onPress={onGame}>GameScreen</Text>
    </ScreenContainer>
  );
}
