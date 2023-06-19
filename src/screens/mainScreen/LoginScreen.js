import { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { authSignInUser } from '../../../redux/auth/authOperations';

import { useTogglePasswordVisibility } from '../../../hooks/useTogglePasswordVisibility';
import Wrapper from '../../../components/Wrapper';
import Context from '../../../context';

const initialState = {
  email: '',
  password: '',
};
export default LoginScreen = ({ navigation }) => {
  const context = useContext(Context);
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const dispatch = useDispatch();
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  //Pass isLoading status on a login screen to show loading progress during the app auth requests.
  const { isLoading } = useSelector((state) => state.auth);

  const handleSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setState(initialState);
    dispatch(authSignInUser(state));
  };

  return (
    <Wrapper title="Login" hideAvatar isLoading={isLoading}>
      <TextInput
        style={styles.input}
        value={state.email}
        onChangeText={(value) =>
          setState((prevState) => ({
            ...prevState,
            email: value,
          }))
        }
        placeholder="e-mail"
        onFocus={() => setIsShowKeyboard(true)}
      ></TextInput>
      <View style={styles.passwordContainer}>
        <TextInput
          onChangeText={(value) =>
            setState((prevState) => ({
              ...prevState,
              password: value,
            }))
          }
          value={state.password}
          placeholder="Password"
          secureTextEntry={passwordVisibility}
          onFocus={() => setIsShowKeyboard(true)}
        ></TextInput>
        <Text
          style={styles.showText}
          onPress={handlePasswordVisibility}
        >
          {rightIcon}
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.btn}
        onPress={() => {
          handleSubmit();
        }}
      >
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
      <Text
        style={styles.signInText}
        onPress={() => {
          navigation.navigate('Registration', {
            sessionId: 45,
            userId: '22e24',
          });
        }}
      >
        Do not have account? Register
      </Text>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  input: {
    marginLeft: 16,
    marginRight: 16,
    height: 50,
    textAlign: 'left',
    color: '#BDBDBD',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 18,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    padding: 10,
  },
  passwordContainer: {
    marginLeft: 16,
    marginRight: 16,
    height: 50,
    textAlign: 'left',
    color: '#BDBDBD',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 18,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputPassWord: {
    height: 50,
    textAlign: 'left',
    color: '#BDBDBD',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 18,
  },
  showText: {
    color: '#1B4371',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
  },
  btn: {
    marginLeft: 16,
    marginRight: 16,
    height: 50,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6C00',
    borderWidth: 0,
    borderRadius: 100,
    padding: 10,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'Roboto-Regular',
  },
  signInText: {
    color: '#1B4371',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
  },
});
