import { GroupCell } from '@/src/components/cells/GroupCell';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStore } from '../store';


const GroupsScreen = () => {
  const { groups } = useStore();
  const { loadGroups, loadLiders } = useStore();
  
  const router = useRouter();

  useEffect(() => {
    loadGroups(1);
  }, [loadGroups]);

  const handlePress = (group_id: number, name: string) => {
    loadLiders(group_id, name)
    router.back();
  };

  return (
      <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <FlatList data={groups}
            keyExtractor={(index) => index.toString()}
            renderItem={({ item }) =>

              <TouchableOpacity onPress={() => handlePress(item.id, item.name)}>
                <GroupCell
                  name={item.name}
                  desc={item.description}
                />
              </TouchableOpacity>   
        }/>
        </View>
      </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 16,
  },
  screen: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 16,
    backgroundColor: '#222'
  },
  container: {
    flex: 1,
    alignContent: 'space-between'
  },
  title: {   
    paddingTop: 20,
    paddingBottom: 10
  },
  summary: { 
    textAlign: 'center',   
    paddingTop: 80,
  },
});

export default GroupsScreen;