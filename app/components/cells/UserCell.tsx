import { StyleSheet, Text, View } from 'react-native';
import { AvatarName } from '../../constants/avatars';
import { colors } from '../../constants/colors';
import { UserAvatar } from '../avatars/UserAvatar';
import { CheckBox } from '../checks/CheckBox';


interface Props {
  isCheck: boolean;
  photo: AvatarName;
  first_name: string;
  last_name: string;
  onCheck: () => void;
}

export const UserCell: React.FC<Props> = ({ isCheck, photo, first_name, last_name, onCheck }) => {
  return (
    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
       <CheckBox checked={isCheck} onPress={onCheck}
          checkedIcon="checkbox-outline" uncheckedIcon={'checkbox-blank-outline'}
          containerStyle={styles.checkBox}
          checkedColor={colors.red[700]}
        />

      <UserAvatar name={photo} size={80} rounded containerStyle={styles.photo}/>
      <Text style={styles.name}>{first_name} {last_name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    marginTop: 12,
    marginBottom: 4,
    fontSize: 16,
    color: 'gold',
    alignSelf: 'flex-start'
  },
  checkBox: {
    margin:0,
    padding: 0,
    backgroundColor: colors.blue[700]
  },
  photo: {
    margin: 8
  }
});


