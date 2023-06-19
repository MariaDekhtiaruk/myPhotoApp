import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import Router from './Router';
import { authStateChanged } from '../redux/auth/authOperations';

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChanged());
  }, []);

  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
};
export default Main;
