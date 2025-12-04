import { ScreenContainer } from '@/src/components/containers/ScreenContainer';
import { Text } from 'react-native';


interface Props {
  pressEvent: () => void;
}

export default function Index({pressEvent}: Props) {
  return (
    <ScreenContainer>
      <Text onPress={pressEvent}>EventsScreen</Text>
    </ScreenContainer>
  );
}
