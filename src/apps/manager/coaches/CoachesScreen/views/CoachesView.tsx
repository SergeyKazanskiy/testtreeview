import { CoachCell } from '@/src/components/cells/CoachCell';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView } from "react-native";
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
    <ScrollView
      contentContainerStyle={{paddingBottom: 100}}
      showsVerticalScrollIndicator={false}
    >
      {coaches.map((item) => (
        <CoachCell
          key={item.id.toString()}
          first_name={item.first_name}
          last_name={item.last_name}
          onSelect={()=>handleSelect(item.id)}
        />
      ))}

      <Pressable onPress={showAddAlert} style={{ marginTop: 16, marginLeft: 8}}>
        <Ionicons name='add-circle-outline' size={26} color='rgb(180, 216, 158)' />
      </Pressable>
    </ScrollView>
  );
};
