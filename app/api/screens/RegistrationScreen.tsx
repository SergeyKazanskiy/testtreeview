import { useState } from "react";
import { Text, View } from "react-native";
import { AuthButton } from '../../components/buttons/AuthButton';
import { AlertContainer } from "../../components/containers/AlertContainer";
import { ScreenContainer } from '../../components/containers/ScreenContainer';
import { AuthInput } from '../../components/inputs/AuthInput';
import { LoadingToast } from "../../components/toasts/LoadingToast";
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../constants/regex';
import { alertStyles, screenStyles } from '../../styles/appStyles';
import { request } from '../request';
import { useAuthState } from "../state";
import { useAuthStore } from '../store';
import { api } from '../utils';


interface Props {
  onSwitch: () => void;
}

export default function RegistrationScreen({ onSwitch }: Props) {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const { loginUser } = useAuthStore();
  const { isError, errorMessage, clearMessages, setError } = useAuthState();
  
  const handleRegister = () => {
    if (password !== confirm) return alert('Passwords do not match');
    if (!EMAIL_REGEX.test(email)) return setError('Invalid email');
    if (!PASSWORD_REGEX.test(password)) return setError('Invalid password');
    
    request(() => api.post('auth/register', { first_name: first, last_name: last, email, password }), (data) => {
      loginUser(data.token, data.user_id);
    });
  };

  return (
    <ScreenContainer>
      <AlertContainer visible={isError} title="Auth error!"
        onClose={() => clearMessages()}>
        <Text style={alertStyles.text}>{errorMessage}</Text> 
      </AlertContainer>

      <Text style={screenStyles.title}>Registration</Text>

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

      <LoadingToast/>
    </ScreenContainer>
  );
}