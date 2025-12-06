import { CustomAlert } from '@/src/components/alerts/CustomAlert';
import { StyleSheet, Text } from 'react-native';
import { useStore } from '../../store';


interface Props {
  onDelete: () => void;
}

export function DeleteGroupAlert({ onDelete }: Props) {
  const { isDeleteGroupAlert, group_id } = useStore();
  const { deleteGroup, hideDeleteGroupAlert } = useStore();

  function handleDelete() {
    hideDeleteGroupAlert();
    deleteGroup(group_id);
    onDelete();
  } 

  return (
    <CustomAlert visible={isDeleteGroupAlert} 
      title="Attention! Really remove?"
      buttonText='Delete'
      handleYes={handleDelete}
      onClose={hideDeleteGroupAlert}>

      <Text style={styles.text}>The group will be deleted.</Text>
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