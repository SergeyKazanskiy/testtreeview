import { Button, StyleSheet, View } from 'react-native';


interface Props {
  title: string;
  secondary?: boolean;
  disabled?: boolean;
  onClick: () => void; 
}

export const AuthButton: React.FC<Props> = ({ title, secondary, disabled, onClick }) => {
  return (
    <View style={[styles.button, secondary && { opacity: 0.7 }]}>
      <Button title={title} onPress={onClick} disabled={disabled}/>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 14,
    width: '60%',
    alignSelf: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
});


