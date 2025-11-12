import { StyleSheet, Text, TextInput } from 'react-native';


interface Props {
  label?: string;
  placeholder?: string;
  value: string;
  secureTextEntry?: boolean;
  onChange: (text: string) => void; 
}

export const AuthInput: React.FC<Props> = ({ label, placeholder, value, secureTextEntry, onChange }) => {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.value}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        secureTextEntry={secureTextEntry}
      />
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 17,
    color: 'gold',
    alignSelf: 'center'
  },
  value: {
    marginTop: 14,
    color: '#444',
    fontSize: 18,
    paddingVertical: 4,
    paddingHorizontal: 12,
    width: '92%',
    borderRadius: 8,
    backgroundColor: 'rgb(180, 216, 158)',
    minHeight: 32,
    alignSelf: 'center'
  },
});


