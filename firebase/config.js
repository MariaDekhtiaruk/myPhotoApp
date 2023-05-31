import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

import {
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDsi14rkxAKPMbFZKnnz7glpbkl_LZ50g4',
  authDomain: 'rn-social-app-8222e.firebaseapp.com',
  databaseURL:
    'https://rn-social-app-8222e-default-rtdb.firebaseio.com/',
  projectId: 'rn-social-app-8222e',
  storageBucket: 'rn-social-app-8222e.appspot.com',
  messagingSenderId: '444926580581',
  appId: '1:444926580581:web:afcff0fc096c371298f38c',
  measurementId: 'G-NDZ54P1RY2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),

  //Persistence configuration and export the ready auth object (no need to use getAuth(app) further)
});

// Initialize Database
export const db = getDatabase(app);

export default auth;
