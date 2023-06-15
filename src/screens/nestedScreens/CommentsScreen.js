import { useState, useEffect } from 'react';
import imgAvatar from '../../../Img/Avatar.jpg';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import useComments from '../../../hooks/useComments';
import { db } from '../../../firebase/config';
import { ref, set } from 'firebase/database';
import { useSelector } from 'react-redux';

const windowWidth = Dimensions.get('window').width;

export default CommentsScreen = ({ route }) => {
  const post = route.params.post;
  const { userId, login } = useSelector((state) => {
    return state.auth;
  });

  const { postId } = post;
  const { getPostComments } = useComments();

  const comments = getPostComments(postId);

  console.log('comments', comments);
  const [comment, setComment] = useState();

  const sendComment = async () => {
    const commentObj = {
      text: comment,
      postId,
      date: new Date().getTime(),
      userId,
      author: login,
    };
    await addCommentToDatabase(commentObj);

    navigation.navigate('DefaultScreen');
  };

  const addCommentToDatabase = async (commentObj) => {
    const commentsRef = ref(db, `comments/${new Date().getTime()}`);

    set(commentsRef, commentObj)
      .then(() => {
        console.log('Comment added successfully');
      })
      .catch((error) => {
        console.error('Error adding comment:', error);
      });
  };

  console.log(comment);

  return (
    <View style={styles.container}>
      <View
        style={{
          marginBottom: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={styles.imgWrap}>
          <Image
            source={{ uri: post.photo }}
            resizeMode="cover"
            style={styles.imagePost}
          />
        </View>

        {comments.map((comment) => (
          <View
            style={
              comment.isMine ? styles.commentMine : styles.comment
            }
          >
            <Text style={styles.dataText}>{comment.author}</Text>
            <Text style={styles.commentText}>{comment.text}</Text>
            <Text style={styles.dataText}>{comment.commentId}</Text>
          </View>
        ))}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            onChangeText={setComment}
          ></TextInput>
          <TouchableOpacity
            onPress={sendComment}
            style={styles.sentBtn}
          >
            <MaterialIcons
              name="add-a-photo"
              color="white"
              size={24}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  dataText: {
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 5,
    color: '#BDBDBD',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 18,
  },

  commentText: {
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 5,
    color: 'red',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 18,
  },
  inputWrapper: {
    width: '100%',
    position: 'relative',
  },
  input: {
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 5,
    height: 50,
    width: '90%',
    textAlign: 'left',
    color: '#BDBDBD',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 18,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  comment: { width: windowWidth - 30 },
  commentMine: {
    width: windowWidth - 30,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 8,
  },

  imagePost: {
    marginTop: 32,
    borderRadius: 20,
    width: 343,
    height: 240,
    borderColor: 'red',
    backgroundColor: 'red',
  },
  sentBtn: {
    marginTop: 20,
    backgroundColor: 'red',
    width: 30,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginLeft: 16,
    marginRight: 16,
    position: 'absolute',
    right: 20,
  },
});
