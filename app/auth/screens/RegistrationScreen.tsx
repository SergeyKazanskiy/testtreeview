import { useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";
import { AuthButton } from '../../components/buttons/AuthButton';
import { ScreenContainer } from '../../components/containers/ScreenContainer';
import { AuthInput } from '../../components/inputs/AuthInput';
import { api } from '../api';
import { useAuthState } from '../store';
import { EMAIL_REGEX, httpWrapper } from '../utils';


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
    if (password !== confirm) return Alert.alert('Passwords do not match');
    if (!EMAIL_REGEX.test(email)) return Alert.alert('Invalid email');

    httpWrapper(
      () => api.post('register', { first_name: first, last_name: last, email, password }),
      (data) => setAuth(data.token, data.user_id)
    );
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

      <AuthButton title="Зарегистрироваться" onClick={handleRegister} />
      <AuthButton title="Go to Login" onClick={onSwitch} secondary />
    </ScreenContainer>
  );
}
      
const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    marginBottom: 20,
  },
});