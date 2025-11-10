// JS SDK, работает в Expo Go
import { initializeApp } from "firebase/app";
import { signInWithCustomToken as firebaseSignInWithCustomToken, getAuth } from "firebase/auth";

// Конфиг Firebase Web
const firebaseConfig = {
  apiKey: "AIzaSy...yourkey",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abc123xyz",
};

// Инициализация приложения
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Универсальный метод логина (можно заменить на нативный SDK)
export async function signInWithCustomToken(token: string) {
  return firebaseSignInWithCustomToken(auth, token);
}

export { auth };


// Пример для нативного Firebase
// import auth from "@react-native-firebase/auth";

// export async function signInWithCustomToken(token: string) {
//   return auth().signInWithCustomToken(token);
// }

