import Toast from 'react-native-toast-message';
import { firebaseAuth } from './setup';
import { useAuthState, useHttpClient } from './store';


export const httpWrapper = async (
  apiCall: () => Promise<any>,
  callback: (data: any) => void
) => {
  const { setLoading, setError } = useHttpClient.getState();

  const run = async (): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await apiCall();
      callback(response.data);
      return true;
    } catch (error: any) {
      const message = error?.response?.data?.detail || 'Server error';
      const status = error?.response?.status;

      if (status === 401) {
        const refreshed = await retryWithFreshToken(apiCall, callback, setError);
        return refreshed;
      }

      setError(message);
      Toast.show({ type: 'error', text1: 'Request failed', text2: message, position: 'top' });
      return false;
    } finally {
      setLoading(false);
    }
  };

  await run();
};

async function retryWithFreshToken(
  apiCall: () => Promise<any>,
  callback: (data: any) => void,
  setError: (msg: string) => void
): Promise<boolean> {
  try {
    const newToken = await firebaseAuth.currentUser?.getIdToken(true);
    if (!newToken) throw new Error('Token refresh failed');

    await useAuthState.getState().refreshToken(newToken);
    const retryResponse = await apiCall();
    callback(retryResponse.data);

    return true;
  } catch (err: any) {
    setError('Auth retry failed: ' + err.message);
    return false;
  }
}

export const EMAIL_REGEX = /^\S+@\S+\.\S+$/;