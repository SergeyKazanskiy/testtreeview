import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useStore } from '../store';
import { GroupsSelect } from './components/GroupsSelect';
import { SearchBox } from './components/SearchBox';
import { HeaderView } from './views/HeaderView';
import { LidersView } from './views/LidersView';


export default function LidersScreen() {
  const { student, query, camps, groups, camp_inx, loaded_group_name, group_name } = useStore();
  const { loadLiders, setQuery, loadCamps, selectCamp, selectGroup } = useStore();
  
  useFocusEffect(
    useCallback(() => {
      loadLiders(student.group_id, group_name);
    }, [student, group_name])
  );

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.background} >
      <ScrollView contentContainerStyle={{paddingBottom: 200}} showsVerticalScrollIndicator={false}>
        <HeaderView/>
        <Text style={styles.title}>LEADER BOARD</Text> 

        <View style={{flexDirection: 'row', justifyContent: 'space-between', gap: 8, paddingBottom: 8}}>
          <GroupsSelect placeholder="Team Filter" loaded_group_name={loaded_group_name}
            camp_inx={camp_inx} camps={camps} groups={groups}
            onOpen={loadCamps} onCamp={selectCamp} onGroup={selectGroup}  />
          <SearchBox placeholder="Search Player" value={query} onChange={setQuery}  />
        </View>
        
        <LidersView/>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingHorizontal: 16,
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "500",
    paddingVertical: 12
  },
});



  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <Pressable style={{ marginRight: 15 }}
  //         onPress={openGroupsScreen} >
  //         <Ionicons name='folder-open' size={24} color="#D1FF4D" />
  //       </Pressable>
  //     ),
  //   });
  // }, [navigation]);
  
  // const openGroupsScreen = () => {
  //   router.push("/dashboards/student/LidersScreen/GroupsScreen");
  // };
