import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
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

export default function LoginScreen({ onSwitch }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuth } = useAuthState();

  const handleLogin = () => {
    if (!EMAIL_REGEX.test(email)) return alert('Invalid email');
    if (password.length < 6) return alert('Password too short');

    request(() => api.post('login', { email, password }), (data) => {
      setAuth(data.token, data.user_id);
    });
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>Login</Text>
      <AuthInput placeholder="Email" value={email} onChange={setEmail} />
      <AuthInput placeholder="Password" value={password} onChange={setPassword} secureTextEntry />

      <AuthButton title="Login" onClick={handleLogin} />
      <AuthButton title="Go to Registration" onClick={onSwitch} secondary />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    marginBottom: 20,
  },
});