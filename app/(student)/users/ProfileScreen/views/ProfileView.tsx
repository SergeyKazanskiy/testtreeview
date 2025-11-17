import { AlertContainer } from '@/app/components/containers/AlertContainer';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, View } from "react-native";
import { useAuthState } from "../../../../api/state";
import { AuthButton } from '../../../../components/buttons/AuthButton';
import { ScreenContainer } from '../../../../components/containers/ScreenContainer';
import { AuthInput } from '../../../../components/inputs/AuthInput';
import { SelectedField } from '../../../../components/selects/SelectedField';
import { LoadingToast } from "../../../../components/toasts/LoadingToast";
import avatars, { AvatarName } from '../../../../constants/avatars';
import { EMAIL_REGEX } from '../../../../constants/regex';
import { alertStyles, screenStyles } from '../../../../styles/appStyles';
import { useStore } from '../../_store';


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