// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState, useEffect, useContext } from 'react';
import {
  MaterialIcons,
  Ionicons,
  EvilIcons,
} from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { ref, set } from 'firebase/database';
import Context from '../../../context';
import { db } from '../../../firebase/config';

async function getLocationPermission(callBack) {
  const { status } =
    await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    // Permission not granted
    alert('Permission not granted');
    return;
  }
  // Permission granted
  callBack();
}

export default CreatePostScreen = ({ navigation }) => {
  const { context } = useContext(Context);

  console.log('context=======', context);

  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState(context.location);

  useEffect(() => {
    console.log('Set location');
    setLocation(context.location);
  }, [context.location]);

  console.log('======location++++', location);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    getLocationPermission(async () => {
      const location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    });

    setPhoto(photo.uri);
    console.log('cam', photo.uri);
  };

  const addPostToDatabase = (post) => {
    const postsRef = ref(db, `posts/${new Date().getTime()}`);

    set(postsRef, post)
      .then(() => {
        console.log('Post added successfully');
      })
      .catch((error) => {
        console.error('Error adding post:', error);
      });
  };

  const sendPhoto = () => {
    const post = { photo, location, name };
    addPostToDatabase(post);

    navigation.navigate('DefaultScreen');
  };

  const sendLocation = () => {
    navigation.navigate('MapScreen', { location });
  };
  const sendComments = () => {
    navigation.navigate('CommentsScreen', {});
  };

  const handleBlur = () => {
    Keyboard.dismiss();
  };
  useEffect(() => {
    async () => {
      let { status } = await Location.locationPermissionsResponce();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
      }
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={handleBlur}>
      <View style={styles.container}>
        <Camera style={styles.camera} ref={setCamera}>
          {photo && (
            <View style={styles.photoContainer}>
              <Image
                source={{ uri: photo }}
                style={{ width: 200, height: 200, borderRadius: 10 }}
              />
            </View>
          )}
          <TouchableOpacity
            onPress={takePhoto}
            style={styles.snapContainer}
          >
            <MaterialIcons
              name="add-a-photo"
              color="white"
              size={24}
            />
          </TouchableOpacity>
        </Camera>
        <Text style={styles.text}>Post your photo</Text>
        <TextInput
          style={styles.input}
          placeholder="Name..."
          onChangeText={(value) => setName(value)}
        ></TextInput>
        <TouchableOpacity onPress={sendLocation} style={styles.input}>
          <EvilIcons name="location" size={24} color="#BDBDBD" />
          <Text style={styles.snap}>
            Location: {location?.latitude},{location?.longitude}
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={sendComments} style={styles.input}>
          <EvilIcons name="comment" size={24} color="#BDBDBD" />
          <Text style={styles.snap}>Comments</Text>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={sendPhoto} style={styles.sentBtn}>
          <Text style={styles.snap}>Publish</Text>
        </TouchableOpacity>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity activeOpacity={0.8} style={styles.btn}>
            <Ionicons name="trash" color="#BDBDBD" size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  camera: {
    height: '40%',
    marginHorizontal: 16,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  snap: {
    color: '#BDBDBD',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
  },

  snapContainer: {
    width: 70,
    height: 70,
    backgroundColor: 'rgba(52, 52, 52, 0.7)',
    borderRadius: '50',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
  },
  text: {
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 5,
    color: '#BDBDBD',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 18,

    padding: 5,
  },
  input: {
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 5,
    height: 50,
    textAlign: 'left',
    color: '#BDBDBD',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 18,
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 1,
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
  },

  btn: {
    marginTop: 30,
    marginLeft: 16,
    marginRight: 16,
    width: 70,
    height: 40,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderWidth: 0,
    borderRadius: 20,
    padding: 10,
  },
  sentBtn: {
    marginTop: 20,
    backgroundColor: '#F6F6F6',
    width: 343,
    height: 40,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginLeft: 16,
    marginRight: 16,
  },
});
