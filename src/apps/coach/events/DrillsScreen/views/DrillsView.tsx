import { DrillCell } from '@/src/components/cells/DrillCell';
import { FlatList, ScrollView, StyleSheet } from 'react-native';
import { ShortDrill } from '../../model';
import { useStore } from '../../store';


export function DrillsView() {
  const { drills } = useStore();
  const { attachDrill, detachDrill } = useStore();

  function handleCheck(present: boolean, drill_id: number) {
    if (present) {
      detachDrill(drill_id);
    } else {
      attachDrill(drill_id);
    }
  }

  function getName(item: ShortDrill) {
    return item.category + ' ' + item.name
  }

  return (
    <ScrollView>
      <FlatList data={drills}
        renderItem={({ item }) =>
          <DrillCell
            name={getName(item)}
            actors={item.actors}
            time={item.time}
            level={item.level}
            checked={item.present}
            onCheck={() => handleCheck(item.present, item.id)}
          />
        } style={styles.list}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: {
    borderRadius: 10,
    padding: 12
  },
});