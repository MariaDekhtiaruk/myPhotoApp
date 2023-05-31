import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import imgAvatar from '../../../Img/Avatar.jpg';
import { useSelector } from 'react-redux';
// import imgForest from '../../Img/Forest.jpg';
// import Wrapper from '../../components/Wrapper';

export default DefaultScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  const { login, email } = useSelector((state) => {
    console.log('state ++++++++', state);
    return state.auth;
  });

  useEffect(() => {
    console.log(route.params);
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  const sendComments = () => {
    navigation.navigate('CommentsScreen', {});
  };
  return (
    <View style={styles.container}>
      <View style={styles.imgWrap}>
        <Image
          source={imgAvatar}
          resizeMode="cover"
          style={styles.imgAvatar}
        />
        <View style={{ marginLeft: 10 }}>
          <Text>{login}</Text>
          <Text>{email}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              source={{ uri: item.photo }}
              style={styles.imagePost}
            />
            <Text style={styles.text}>{item.name}</Text>
            {console.log('==========', item)}
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              <TouchableOpacity
                onPress={sendComments}
                style={styles.inputComment}
              >
                <EvilIcons name="comment" size={24} color="#BDBDBD" />
                <Text style={styles.snap}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity
                // onPress={sendLocation}
                style={styles.inputMap}
              >
                <EvilIcons
                  name="location"
                  size={24}
                  color="#BDBDBD"
                />
                <Text style={styles.snap}>
                  Location: {item.location.latitude},
                  {item.location.longitude}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  imgWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
    marginLeft: 16,

    // justifyContent: 'center',
  },

  text: {
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 5,
    color: '#BDBDBD',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 18,
    justifyContent: '',
    padding: 5,
  },
  imagePost: {
    marginTop: 32,
    borderRadius: 20,
    width: 343,
    height: 240,
    borderColor: 'red',
    backgroundColor: 'red',
  },
  imgAvatar: {
    borderRadius: 16,
    width: 60,
    height: 60,
  },
  inputMap: {
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 5,
    width: 255,
    height: 24,
    textAlign: 'left',
    color: '#BDBDBD',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 18,
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 1,
    borderRadius: 8,

    flexDirection: 'row',
  },
  inputComment: {
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 5,
    width: 39,
    height: 24,
    textAlign: 'left',
    color: '#BDBDBD',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 18,
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 1,
    borderRadius: 8,

    flexDirection: 'row',
  },
});
