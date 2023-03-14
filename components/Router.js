import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native';
import CreatePostsScreen from '../screens/CreatePostsScreen';
import ProfileScreen from '../screens/ProfileScreen';
const MainStack = createStackNavigator();

const useAuth = (isAuth) =>
  isAuth ? (
    <>
      <MainStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          // title: 'Home screen',
          // headerStyle: {
          //   backgroundColor: '#f4511e',
          // },
          // headerTintColor: '#fff',
          // headerTitleStyle: {
          //   fontWeight: 'bold',
          //   fontSize: 20,
          // },
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          title: 'Create Post',
        }}
      />
      {/* <MainStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: 'Profile',
        }}
      /> */}
    </>
  ) : (
    <>
      <MainStack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: 'Login screen',
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{
          title: 'Registration screen',
          headerShown: false,
        }}
      />
    </>
  );

export default Router = ({ isAuth }) => (
  <MainStack.Navigator initialRouteName="Login">
    {useAuth(isAuth)}
  </MainStack.Navigator>
);
