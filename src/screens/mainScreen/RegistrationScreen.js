import { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';

import { useDispatch } from 'react-redux';
import { authSignUpUser } from '../../../redux/auth/authOperations';

import Context from '../../../context';
import imgAvatar from '../../../Img/Avatar.jpg';
import { useTogglePasswordVisibility } from '../../../hooks/useTogglePasswordVisibility';
import Wrapper from '../../../components/Wrapper';

const initialState = {
  login: '',
  email: '',
  password: '',
};

export default RegistrationScreen = ({
  navigation,
  onLoginSuccessful,
}) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const context = useContext(Context);
  const [avatar, setAvatar] = useState('');
  const [state, setState] = useState(initialState);

  const dispatch = useDispatch();

  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  const handleSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setState(initialState);
    dispatch(authSignUpUser(state));
  };

  return (
    <Wrapper
      imageAvatar={avatar}
      title="Registration"
      onAvatarSetHandler={() => setAvatar(imgAvatar)}
      isShowKeyboard={isShowKeyboard}
    >
      <TextInput
        style={styles.input}
        // onChangeText={(login) => setLogin(login)}
        value={state.login}
        onChangeText={(value) =>
          setState((prevState) => ({
            ...prevState,
            login: value,
          }))
        }
        placeholder="Login"
        onFocus={() => setIsShowKeyboard(true)}
      ></TextInput>
      <TextInput
        style={styles.input}
        value={state.email}
        // onChangeText={(mail) => setMail(mail)}
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
          style={styles.inputPassWord}
          // onChangeText={(passWord) => setPassWord(passWord)}
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
          //context.setIsAuth(true);
        }}
      >
        <Text style={styles.btnText}>Registered</Text>
      </TouchableOpacity>
      <Text
        style={styles.signInText}
        onPress={() => {
          navigation.navigate('Login');
        }}
      >
        Has already registered? Sign In
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
    borderRadius: 4,
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
