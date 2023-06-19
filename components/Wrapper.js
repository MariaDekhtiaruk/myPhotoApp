import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import imgBg from '../Img/PhotoBG.jpg';
import AddSvg from '../Img/AddSvg';

export default Wrapper = ({
  children,
  imageAvatar,
  hideAvatar,
  title,
  onAvatarSetHandler,
  isShowKeyboard,
  isLoading,
}) => {
  const [dimensions, setDimensions] = useState(
    Dimensions.get('window').width - 8 * 2
  );
  useEffect(() => {
    const onChangeRotation = () => {
      const width = Dimensions.get('window').width - 8 * 2;
      setDimensions(width);
    };
    const dimensionsChangeHandler = Dimensions.addEventListener(
      'change',
      onChangeRotation
    );
    return () => () => dimensionsChangeHandler.remove();
  }, []);

  useEffect(() => {
    if (!isShowKeyboard) {
      keyboardHide();
    }
  }, [isShowKeyboard]);

  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  return (
    //Show loading instead of page content while the app makes requests.
    isLoading ? (
      <ActivityIndicator size="large" style={{ height: '100%' }} />
    ) : (
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View style={styles.container}>
          <ImageBackground
            source={imgBg}
            resizeMode="cover"
            style={styles.imageBG}
          />

          <View style={styles.screenWrap}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.container}
            >
              {!hideAvatar ? (
                <View>
                  {imageAvatar ? (
                    <Image
                      source={imageAvatar}
                      resizeMode="cover"
                      style={styles.imageAvatar}
                    />
                  ) : (
                    <View style={styles.imageAvatarEmpty}></View>
                  )}
                  <AddSvg
                    style={styles.AddSvg}
                    onPress={onAvatarSetHandler}
                  />
                </View>
              ) : null}

              <Text style={styles.title}>{title}</Text>
              <View
                style={{
                  ...styles.form,
                  marginBottom: isShowKeyboard ? 5 : 78,
                  width: dimensions,
                }}
              >
                {children}
              </View>
            </KeyboardAvoidingView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
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
  imageAvatar: {
    borderRadius: 20,
    marginTop: -60,
    marginBottom: -60,
    width: 120,
    height: 120,
  },
  imageAvatarEmpty: {
    borderRadius: 20,
    marginTop: -60,
    marginBottom: -60,
    width: 120,
    height: 120,
    backgroundColor: 'gray',
  },
  AddSvg: {
    position: 'absolute',
    top: '50%',
    bottom: '50%',
    transform: [{ translateY: 20 }, { translateX: 105 }],
  },
  title: {
    marginTop: 92,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
    marginBottom: 32,
  },
});
