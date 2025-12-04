import { request } from '@/src/api/request';
import { useAuthState } from '@/src/api/state';
import { useAuthStore } from '@/src/api/store';
import { api } from '@/src/api/utils';
import { AuthButton } from '@/src/components/buttons/AuthButton';
import { AlertContainer } from '@/src/components/containers/AlertContainer';
import { ScreenContainer } from '@/src/components/containers/ScreenContainer';
import { AuthInput } from '@/src/components/inputs/AuthInput';
import { LoadingToast } from '@/src/components/toasts/LoadingToast';
import { EMAIL_REGEX, PASSWORD_REGEX } from '@/src/constants/regex';
import { alertStyles, screenStyles } from '@/src/styles/appStyles';
import { useState } from 'react';
import { Text } from 'react-native';


interface Props {
  onSwitch: () => void;
  onLogin: () => void;
}

export default function LoginScreen({ onSwitch, onLogin }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loginUser } = useAuthStore();
  const { isError, errorMessage, clearMessages, setError } = useAuthState();

  const handleLogin = () => {
    if (!EMAIL_REGEX.test(email)) return setError('Invalid email');
    if (!PASSWORD_REGEX.test(password)) return setError('Invalid password');

    request(() => api.post('auth/login', { email, password }), (data) => {
      loginUser(data.token, data.user_id);
      onLogin();
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
