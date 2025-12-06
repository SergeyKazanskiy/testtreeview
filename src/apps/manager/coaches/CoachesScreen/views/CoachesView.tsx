import { CoachCell } from '@/src/components/cells/CoachCell';
import { Ionicons } from '@expo/vector-icons';
import { FlatList, Pressable, ScrollView, StyleSheet } from "react-native";
import { useStore } from '../../store';


type Props = {
  onCoach: () => void;
};

export const CoachesView = ({ onCoach }: Props) => { 
    const { coaches} = useStore();
    const { selectCoach, showAddAlert } = useStore();
  
    function handleSelect(id: number) {
      selectCoach(id);
      onCoach();
    }

  return (
    <ScrollView style={styles.container}>
        <FlatList data={coaches} 
            keyExtractor={(index) => index.toString()}
            renderItem={({ item, index }) =>
              <CoachCell
                first_name={item.first_name}
                last_name={item.last_name}
                onSelect={()=>handleSelect(item.id)}
              />
        }/>
        <Pressable onPress={showAddAlert} style={{ marginTop: 16, marginLeft: 8}}>
          <Ionicons name='add-circle-outline' size={26} color='rgb(180, 216, 158)' />
        </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    //marginTop: 60,
  },
});
