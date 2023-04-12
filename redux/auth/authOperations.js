import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
} from 'firebase/auth';

import app from '../../firebase/config';

export const authSignUpUser =
  ({ email, password, login }) =>
  async (dispatch, getState) => {
    console.log('user=======', email, password);
    try {
      console.log('email=', email, 'password=', password);

      const user = await createUserWithEmailAndPassword(
        getAuth(app),
        email,
        password
      );
      console.log('user', user);
    } catch (error) {
      console.log('error', error);
      console.log('error.message', error.message);
    }
  };
export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    console.log('user=======', email, password);
    try {
      console.log('email=', email, 'password=', password);

      const user = await signInWithEmailAndPassword(
        getAuth(app),
        email,
        password
      );
      console.log('user', user);
    } catch (error) {
      console.log('error', error);
      console.log('error.message', error.message);
    }
  };
export const authSignOutUser = () => async (dispatch, getState) => {};