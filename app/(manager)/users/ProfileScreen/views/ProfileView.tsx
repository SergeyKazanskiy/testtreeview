import { useAuthState } from "@/src/api/state";
import { AuthButton } from '@/src/components/buttons/AuthButton';
import { AlertContainer } from '@/src/components/containers/AlertContainer';
import { ScreenContainer } from '@/src/components/containers/ScreenContainer';
import { AuthInput } from '@/src/components/inputs/AuthInput';
import { SelectedField } from '@/src/components/selects/SelectedField';
import { LoadingToast } from "@/src/components/toasts/LoadingToast";
import avatars, { AvatarName } from '@/src/constants/avatars';
import { EMAIL_REGEX } from '@/src/constants/regex';
import { alertStyles, screenStyles } from '@/src/styles/appStyles';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, View } from "react-native";
import { useStore } from '../../store';


export function ProfileView() {
  const { isError, errorMessage, clearMessages, setError } = useAuthState();
  const { first_name, last_name, photo, email, isProfileChanged } = useStore()
  const { setFirstName, setLastName, setPhoto, setEmail, checkProfile, updateProfile } = useStore()

  const avatarNames = Object.keys(avatars).slice(0, -1) as AvatarName[];
  const options = avatarNames.map((name, index) => ({ id: index, name: name }));
  const router = useRouter();

  useEffect(() => {
    checkProfile();
  }, [first_name, last_name, photo, email])

  const handleUpdate = () => {
    if (!EMAIL_REGEX.test(email)) return setError('Enter valid email');
    updateProfile(router.back)
  };

  return (
    <ScreenContainer>
      <AlertContainer visible={isError} title="Invalid email!"
        onClose={() => clearMessages()}>
        <Text style={alertStyles.text}>{errorMessage}</Text> 
      </AlertContainer>

      <Text style={screenStyles.title}>Profile</Text>
      <SelectedField data={options} selectedIndex={avatarNames.findIndex(el => el === photo)}
        onSelect={(inx) => setPhoto(avatarNames[inx])}/>

      <AuthInput label="First name" value={first_name} onChange={setFirstName} />
      <AuthInput label="Second name" value={last_name} onChange={setLastName} />
      <AuthInput label="Email" placeholder="Email" value={email} onChange={setEmail} />

      <View style={{ marginTop: 12 }}>
        <AuthButton title="Save" onClick={handleUpdate} disabled={!isProfileChanged} />
      </View>

      <LoadingToast/>
    </ScreenContainer>
  );
}