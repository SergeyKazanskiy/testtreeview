import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { firebaseAuth } from './setup';
import { useAuthState } from './store';


export const request = async (
  apiCall: () => Promise<any>,
  callback: (data: any) => void
) => {
  const [loading, setLoading] = useState(true);
  if (loading) {
    Toast.show({ type: 'info', text1: 'Loading...', position: 'bottom', visibilityTime: 1200, autoHide: true});
  }

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
        const refreshed = await retryWithFreshToken(apiCall, callback);
        return refreshed;
      }

      Toast.show({ type: 'error', text1: 'Request failed', text2: message, position: 'top', visibilityTime: 1200, autoHide: true });
      return false;
    } finally {
      setLoading(false);
    }
  };

  await run();
};

async function retryWithFreshToken(
  apiCall: () => Promise<any>,
  callback: (data: any) => void
): Promise<boolean> {
  try {
    const newToken = await firebaseAuth.currentUser?.getIdToken(true);
    if (!newToken) throw new Error('Token refresh failed');

    await useAuthState.getState().refreshToken(newToken);
    const retryResponse = await apiCall();
    callback(retryResponse.data);

    return true;
  } catch (err: any) {
    Toast.show({ type: 'error', text1: 'Auth retry failed', text2: err.message, position: 'top', visibilityTime: 1200, autoHide: true });
    return false;
  }
}