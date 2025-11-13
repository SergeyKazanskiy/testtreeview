import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthButton } from '../../components/buttons/AuthButton';
import { ScreenContainer } from '../../components/containers/ScreenContainer';
import { AuthInput } from '../../components/inputs/AuthInput';
import { api } from '../api';
import { EMAIL_REGEX } from '../constants';
import { useAuthState } from '../store';
import { request } from '../utils';


interface Props {
  onSwitch: () => void;
}

export default function RegistrationScreen({ onSwitch }: Props) {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const { setAuth } = useAuthState();
  
  const handleRegister = () => {
    if (password !== confirm) return alert('Passwords do not match');
    if (!EMAIL_REGEX.test(email)) return alert('Invalid email');
    alert('Registering...');
    request(() => api.post('register', { first_name: first, last_name: last, email, password }), (data) => {
      alert('Registration successful');
      setAuth(data.token, data.user_id);
    });
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>Registration</Text>

      <AuthInput label="First name" value={first} onChange={setFirst} />
      <AuthInput label="Second name" value={last} onChange={setLast} />

      <AuthInput label="Email" placeholder="Email" value={email} onChange={setEmail} />
      <AuthInput label="Password" placeholder="at least 6 characters" value={password} secureTextEntry
        onChange={setPassword} />
      <AuthInput label="Confirm password" value={confirm} secureTextEntry
        onChange={setConfirm} />

      <View style={{ marginTop: 12 }}>
        <AuthButton title="Зарегистрироваться" onClick={handleRegister} />
        <AuthButton title="Go to Login" onClick={onSwitch} secondary />
      </View>
    </ScreenContainer>
  );
}
      
const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    marginBottom: 12,
    fontSize: 24,
    alignSelf: 'center',
    color: 'white'
  },
});