import { useAuthState } from '@/src/api/state';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { ActivityIndicator, Platform, StyleSheet } from 'react-native';
import { useStore } from '../store';
import { AddGroupAlert } from './alerts/AddGroupAlert';
import { CampsView } from './views/CampsView';
import { GroupsView } from './views/GroupsView';


type Props = {
  onGroup:() => void;
};

export default function GroupsScreen({ onGroup }: Props) {
  const { isLoading } = useAuthState();
  const { groups, camps, camp_id, camp_inx } = useStore();
  const { loadCamps, updateGroup, deleteGroup, selectCamp } = useStore();

  // useFocusEffect(
  //   useCallback(() => {
  //     loadCamps();
  //   }, [])
  // );

  useEffect(() => {
    loadCamps();
  }, []);

  useEffect(() => {
    if (camp_inx > -1) selectCamp(camp_id, camp_inx);
  }, [updateGroup, deleteGroup]);

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper} >
      <AddGroupAlert/>
      
      <CampsView/>
      <GroupsView onGroup={onGroup}/>

      { (groups.length === 0 || camps.length === 0) && isLoading &&
        <ActivityIndicator size="large" color="#fff" />
      }
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignSelf: Platform.OS === 'web' ? 'flex-start' : 'stretch',
    maxWidth: Platform.OS === 'web' ? 360 : undefined,
    width: '100%',
    paddingHorizontal: 16,
  },
});
