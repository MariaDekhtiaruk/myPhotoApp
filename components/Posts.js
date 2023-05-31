import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import usePosts from '../hooks/usePosts';

const Posts = ({ sendComments }) => {
  const posts = usePosts();
  return (
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
              <EvilIcons name="location" size={24} color="#BDBDBD" />
              <Text style={styles.snap}>
                Location: {item.location.latitude},
                {item.location.longitude}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
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

export default Posts;
