import { useState } from 'react';
import { Text } from 'react-native';
import { AuthButton } from '../../components/buttons/AuthButton';
import { AlertContainer } from '../../components/containers/AlertContainer';
import { ScreenContainer } from '../../components/containers/ScreenContainer';
import { AuthInput } from '../../components/inputs/AuthInput';
import { LoadingToast } from '../../components/toasts/LoadingToast';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../constants/regex';
import { alertStyles, screenStyles } from '../../styles/appStyles';
import { request } from '../request';
import { useAuthState } from '../state';
import { useAuthStore } from '../store';
import { api } from '../utils';


interface Props {
  onSwitch: () => void;
}

export default function LoginScreen({ onSwitch }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loginUser } = useAuthStore();
  const { isError, errorMessage, clearMessages, setError } = useAuthState();

  const handleLogin = () => {
    if (!EMAIL_REGEX.test(email)) return setError('Invalid email');
    if (!PASSWORD_REGEX.test(password)) return setError('Invalid password');

    request(() => api.post('auth/login', { email, password }), (data) => {
      loginUser(data.token, data.user_id);
    });
  };

  return (
    <ScreenContainer>
      <AlertContainer visible={isError} title="Auth error!"
        onClose={() => clearMessages()}>
        <Text style={alertStyles.text}>{errorMessage}</Text> 
      </AlertContainer>

      <Text style={screenStyles.title}>Login</Text>
      <AuthInput label="Email" placeholder="Email" value={email} onChange={setEmail} />
      <AuthInput label="Password" placeholder="Password" value={password} onChange={setPassword} secureTextEntry />

      <AuthButton title="Login" onClick={handleLogin} />
      <AuthButton title="Go to Registration" onClick={onSwitch} secondary />

      <LoadingToast/>
    </ScreenContainer>
  );
}
