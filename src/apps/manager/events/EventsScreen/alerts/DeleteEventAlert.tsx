import { CustomAlert } from '@/src/components/alerts/CustomAlert';
import { StyleSheet, Text } from 'react-native';
import { useStore } from '../../store';


export function DeleteEventAlert() {
  const { isDeleteAlert, event_id } = useStore();
  const { deleteEvent, hideDeleteAlert } = useStore();

  return (
    <CustomAlert visible={isDeleteAlert} 
      title="Attention! Really delete?"
      buttonText='Delete'
      handleYes={()=>deleteEvent(event_id)}
      onClose={hideDeleteAlert}>

      <Text style={styles.text}>Selected event will be deleted.</Text>
    </CustomAlert>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: '#ccc',
    marginHorizontal: 4,
  },
});