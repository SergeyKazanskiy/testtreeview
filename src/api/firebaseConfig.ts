import { initializeApp } from "firebase/app"; //getReactNativePersistence
import { getAuth, signInWithCustomToken } from "firebase/auth";


// export const firebaseConfig = {
//   apiKey: "AIzaSyCi12mBo2ZY8z3o2pQW_M_V5yqgf1i0SzI",
//   authDomain: "dinivrey-a4d49.firebaseapp.com",
//   projectId: "dinivrey-a4d49",
//   storageBucket: "dinivrey-a4d49.firebasestorage.app",
//   messagingSenderId: "735296528155",
//   appId: "1:735296528155:web:2a8af930c1a0b23184bdbe"
// }

// export const firebaseConfig = Platform.OS === 'web' ? {
//   apiKey: "AIzaSyCi12mBo2ZY8z3o2pQW_M_V5yqgf1i0SzI",
//   authDomain: "dinivrey-a4d49.firebaseapp.com",
//   projectId: "dinivrey-a4d49",
//   storageBucket: "dinivrey-a4d49.firebasestorage.app",
//   messagingSenderId: "735296528155",
//   appId: "1:735296528155:web:2a8af930c1a0b23184bdbe"
// } : {
export const firebaseConfig = {
  apiKey: "AIzaSyBdbvQtySbOo7ktdgKcFTOCUoShnE40hpY",
  authDomain: "dinivreyauth.firebaseapp.com",
  projectId: "dinivreyauth",
  storageBucket: "dinivreyauth.firebasestorage.app",
  messagingSenderId: "836946640807",
  appId: "1:836946640807:web:3878ff5d5f096f262c0082"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
// export const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage),
// });

export const signInWithToken = async (token: string) => {
  return await signInWithCustomToken(auth, token);
};



// let firebaseAuth: any;
// let signInWithToken: any;

// try {
//   const nativeAuth = require("@react-native-firebase/auth").default;
//   firebaseAuth = nativeAuth();
//   signInWithToken = (token: string) => firebaseAuth.signInWithCustomToken(token);
// } catch {
//   firebaseAuth = getAuth(app);
//   signInWithToken = (token: string) => signInWithCustomToken(firebaseAuth, token);
// }