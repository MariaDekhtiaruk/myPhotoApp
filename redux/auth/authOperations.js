import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth';

import auth from '../../firebase/config';
import { authSlice } from './authReducer';

export const authSignUpUser =
  ({ email, password, login }) =>
  async (dispatch, getState) => {
    console.log('user=======', email, password);
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = auth.currentUser;

      await updateProfile(user, {
        displayName: login,
      });
      const updateUserSuccess = await user.auth.currentUser;

      console.log('updateUserSuccess========', updateUserSuccess);

      dispatch(
        authSlice.actions.updateUserProfile({
          userId: updateUserSuccess.uid,
          login: updateUserSuccess.displayName,
          email: updateUserSuccess.email,
        })
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
    // Show loading
    dispatch(authSlice.actions.setLoading(true));
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log('user', user);
    } catch (error) {
      console.log('error', error);
      console.log('error.message', error.message);
    }
    // Hide loading
    dispatch(authSlice.actions.setLoading(false));
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  // Show loading
  dispatch(authSlice.actions.setLoading(true));
  //Make Firebase SignOut and clean up the user object in the redux state - this will affect the router isAuth to navigate to the login screen again.
  await auth.signOut();
  dispatch(
    authSlice.actions.updateUserProfile({
      login: null,
      userId: null,
    })
  );
  // Hide loading
  dispatch(authSlice.actions.setLoading(false));
};

////////
export const authStateChanged = () => async (dispatch, getState) => {
  // Show loading
  dispatch(authSlice.actions.setLoading(true));

  await onAuthStateChanged(auth, (user) => {
    if (user) {
      const userUpdateProfile = {
        login: user.displayName,
        userId: user.uid,
        email: user.email,
      };

      dispatch(
        authSlice.actions.updateUserProfile(userUpdateProfile)
      );
      //Remove stateChange completely. It is redundant since we have direct access to the user object in the Redux state to check the session.
      // dispatch(
      //   authSlice.actions.authStateChange({ stateChange: true })
      // );
    }
    // Hide loading
    dispatch(authSlice.actions.setLoading(false));
  });
};
