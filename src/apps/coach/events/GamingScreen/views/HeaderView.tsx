import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { useStore } from '../../store';


export function HeaderView() {
  const { isHeader, blockRoleChosing, isReportButton } = useStore();
  const { toggleHeader, swapRoles, showReport } = useStore();

  return (
    <View style={styles.row}>
      {isReportButton &&
        <Pressable style={{ marginRight: 30 }} onPress={showReport} >
          <Ionicons name='document-text-outline' size={20} color='#D1FF4D'/>
        </Pressable>
      }   

      <Pressable style={{right: 28, top: 6}} onPress={swapRoles} disabled={blockRoleChosing} >
        <Ionicons name='repeat-outline' size={20} color="#D1FF4D" />
      </Pressable>

      <Pressable style={{padding: 8}} onPress={toggleHeader} >
        <Ionicons name={ isHeader ? 'chevron-up' : 'chevron-down'} size={20} color='#D1FF4D'/>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});