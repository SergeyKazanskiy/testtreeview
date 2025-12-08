import { useAuthStore } from '@/src/api/store';
import { Icon } from '@/src/components/icons/CustomIcon';
import { ListItem } from '@/src/components/widgets/CustomListItem';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useStore } from '../store';
import { StudentList } from './views/StudentList';


interface Props {
  pressStudent: () => void;
}
  
export default function GroupsScreen({ pressStudent }: Props) {
  const { groups, group_id } = useStore();
  const { loadGroups, selectGroup } = useStore();

  const { userId } = useAuthStore();

  useFocusEffect(
    useCallback(() => {
    //  alert(userId)
      loadGroups(userId);
    }, [])
  );

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper} >
      <ScrollView contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}> 
        {groups.map((group, index) =>
          <ListItem.Accordion key={index}
            containerStyle={styles.group}
            isExpanded={group.id === group_id}
            onPress={() => selectGroup(group.id, index)}
            icon={{}}
            content={
              <>
                <Icon name={group.id === group_id ? 'chevron-down' : 'chevron-right'}
                  type="material-community" color="white" style={{ marginRight: 10 }} />
                <ListItem.Content>
                  <ListItem.Title style={styles.title}>{group.camp_name}, {group.name}</ListItem.Title>
                  <ListItem.Subtitle style={styles.subtitle}>{group.description}</ListItem.Subtitle>
                </ListItem.Content>
              </>
            }
          >
            <StudentList pressStudent={pressStudent}/>
          </ListItem.Accordion>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
    padding: 16,
  },
  group: {
    backgroundColor: '#152B52',
    // borderTopWidth: 1,
    // borderLeftWidth: 1,
    // borderColor: 'green',
    paddingTop: 6,
    paddingBottom: 4,
    marginVertical: 3
  },
  title: { color: '#ddd', fontWeight: '500' },
  subtitle: { color: '#A7CFF5' },
});