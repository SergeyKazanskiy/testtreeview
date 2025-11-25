import { firebaseAuth } from './firebaseConfig';
import { useAuthState } from './state';
import { useAuthStore } from './store';


export const request = async (
  apiCall: () => Promise<any>,
  callback: (data: any) => void) => {

  useAuthState.getState().showLoading();

  const run = async (): Promise<boolean> => {
    try {
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
      useAuthState.getState().setError(message);
      return false;
    } finally {
      useAuthState.getState().hideLoading();
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

    await useAuthStore.getState().refreshToken(newToken);
    const retryResponse = await apiCall();
    callback(retryResponse.data);

    return true;
  } catch (error: any) {
    const message = error?.response?.data?.detail || 'Server error';
    useAuthState.getState().setError(message);
    return false;
  }
}