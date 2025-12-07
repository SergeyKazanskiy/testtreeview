import { PopupContainer } from '@/src/components/containers/PopupContainer';
import { LinearGradient } from 'expo-linear-gradient';
import { FlatList, Platform, StyleSheet } from 'react-native';
import { useStore } from '../../store';
import { CoachCell } from '../cells/CoachCell';


export function CoachesScreen() {
  const { coaches, isCoachesView } = useStore();
  const { hideCoachesView, selectNewCoach } = useStore();

  return (
     <PopupContainer visible={isCoachesView} title='Select other coach' onClose={hideCoachesView}>
      <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper} >
          
          <FlatList
            data={coaches}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (

              <CoachCell
                first_name={item.first_name}
                last_name={item.last_name}
                camp_name={item.camp_name}
                onSelect={() => selectNewCoach(item.id)}
              />
            )} style={styles.list}
          />
      </LinearGradient>
      </PopupContainer>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignSelf: Platform.OS === 'web' ? 'flex-start' : 'stretch',
    maxWidth: Platform.OS === 'web' ? 360 : undefined,
    width: '100%',
    height: '100%',
  },
    list: {
    borderRadius: 10,
    padding: 12
  },
});