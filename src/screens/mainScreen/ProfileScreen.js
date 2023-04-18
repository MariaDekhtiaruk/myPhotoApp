import { useContext, useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import imgForest from '../../../Img/Forest.jpg';
import imgAvatar from '../../../Img/Avatar.jpg';
import imgBg from '../../../Img/PhotoBG.jpg';
import DeleteSvg from '../../../Img/deleteSvg';
import LogoutSvg from '../../../Img/LogOutSvg';
import Context from '../../../context';
// const Tabs = createBottomTabNavigator();

// const PROFILE_ROUTE = 'Profile';
// const POSTS_ROUTE = 'Posts';
// const CREATEPOSTSCREEN_ROUTE = 'CreatePostsScreen';

export default ProfileScreen = () => {
  const context = useContext(Context);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={imgBg}
        resizeMode="cover"
        style={styles.imageBG}
      />
      <View style={styles.screenWrap}>
        <LogoutSvg
          style={styles.logoutSvg}
          // onPress={() => context.setIsAuth(false)}
        />
        <View style={styles.imgWrap}>
          <Image
            source={imgAvatar}
            resizeMode="cover"
            style={styles.imgAvatar}
          />
          <DeleteSvg style={styles.deleteSvg} />
        </View>
        <Text style={styles.nameText}>Natalia Romanova</Text>
        <Image
          source={imgForest}
          resizeMode="cover"
          style={styles.imagePost}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  imageBG: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  imgWrap: {
    marginBottom: 60,
  },

  imgAvatar: {
    borderRadius: 20,
    marginTop: -60,
    marginBottom: -60,
    width: 120,
    height: 120,
  },

  nameText: {
    color: '#212121',
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
  },
  screenWrap: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    paddingBottom: 16,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowOpacity: 1,
    shadowRadius: 25,
    shadowColor: 'black',
    gap: 16,
    backgroundColor: '#FFFFFF',
    color: '#BDBDBD',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    gap: 16,

    ...Platform.select({
      ios: {
        justifyContent: 'center',
      },
      android: { justifyContent: 'flex-end' },
    }),
  },

  deleteSvg: {
    position: 'absolute',
    top: '50%',
    bottom: '50%',
    transform: [{ translateY: 20 }, { translateX: 100 }],
  },
  logoutSvg: {
    position: 'absolute',
    right: 15,
    top: 15,

    color: 'red',
  },

  imagePost: {
    borderRadius: 20,
    width: 343,
    height: 240,
  },
});
