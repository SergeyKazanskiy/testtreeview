import { Button, StyleSheet, View } from 'react-native';


interface Props {
  title: string;
  secondary?: boolean;
  onClick: () => void; 
}

export const AuthButton: React.FC<Props> = ({ title, secondary, onClick }) => {
  return (
    <View style={[styles.button, secondary && { opacity: 0.7 }]}>
      <Button title={title} onPress={onClick}/>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 14,
    width: '60%',
    alignSelf: 'center'
  },
});


