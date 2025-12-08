import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { useStore } from '../store';
import { AddGroupAlert } from './alerts/AddGroupAlert';
import { CampsView } from './views/CampsView';
import { GroupsView } from './views/GroupsView';


type Props = {
  onGroup:() => void;
};

export default function GroupsScreen({ onGroup }: Props) {
  const {  } = useStore();
  const { loadCamps, updateGroup } = useStore();

  useEffect(() => {
    loadCamps();
  }, [updateGroup]);

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper} >
      <AddGroupAlert/>
      
      <CampsView/>
      <GroupsView onGroup={onGroup}/>
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
