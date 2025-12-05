import { CheckBox } from '@/src/components/checks/CheckBox';
import { StyleSheet, Text, View } from 'react-native';


interface Props {
  type: string;
  onType: (type: string) => void;
}

export function TypesView({type, onType}: Props) {
  return (
    <View style= {styles.container}>
        <View style= {styles.section}>
            <Text style= {styles.title}>Training:</Text>
            <CheckBox size={20}
                checked={type === 'Training'}
                onPress={() => onType('Training')}
                checkedIcon="radiobox-marked"
                uncheckedIcon="radiobox-blank"
                containerStyle={{ padding: 0, backgroundColor: 'transparent'}}
            />
        </View>
        <View style= {styles.section}>
            <Text style= {styles.title}>Exam:</Text>
            <CheckBox size={20}
                checked={type === 'Exam'}
                onPress={() => onType('Exam')}
                checkedIcon="radiobox-marked"
                uncheckedIcon="radiobox-blank"
                containerStyle={{ padding: 0, backgroundColor: 'transparent'}}
            />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
  },
  title: {
    fontSize: 16,
    color: '#ddd'
  },
});

