import { ScreenContainer } from '@/src/components/containers/ScreenContainer';
import { Text } from 'react-native';


interface Props {
  pressStudent: () => void;
}

export default function Index({pressStudent}: Props) {
  return (
    <ScreenContainer>
      <Text onPress={pressStudent}>TestingScreen</Text>
    </ScreenContainer>
  );
}
