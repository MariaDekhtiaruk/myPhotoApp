import imgAvatar from '../../../Img/Avatar.jpg';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import useComments from '../../../hooks/useComments';

import { ref, set } from 'firebase/database';

export default CommentsScreen = ({ route }) => {
  const post = route.params.post;

  const { postId } = post;
  const comments = useComments(postId);

  console.log('comments', comments);

  const sendComments = () => {
    const postComment = { comment };
    addCommentToDatabase(post);

    navigation.navigate('DefaultScreen');
  };
  const addCommentToDatabase = (post) => {
    const postsRef = ref(db, `comments`);

    set(postsRef, post)
      .then(() => {
        console.log('Comment added successfully');
      })
      .catch((error) => {
        console.error('Error adding comment:', error);
      });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          marginBottom: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          source={{ uri: post.photo }}
          style={styles.imagePost}
        />

        {comments.map((comment) => (
          <View style={{ marginLeft: 10 }}>
            <Text>{comment.commentId}</Text>
            <Text>{comment.text}</Text>
          </View>
        ))}
        <TouchableOpacity
          onPress={sendComments}
          style={styles.snapContainer}
        >
          <MaterialIcons name="add-a-photo" color="white" size={24} />
        </TouchableOpacity>
      </View>
    </View>
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
