import { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
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

  const commentsWrapperRef = useRef(null);

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
    setComment('');
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

  useEffect(() => {
    if (commentsWrapperRef.current) {
      setTimeout(() => {
        commentsWrapperRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [comments.length]);

  return (
    <View style={styles.container}>
      <View style={styles.imgWrapper}>
        <Image
          source={{ uri: post.photo }}
          resizeMode="cover"
          style={styles.imagePost}
        />
      </View>
      <View style={styles.commentsWrapper}>
        <ScrollView ref={commentsWrapperRef}>
          {comments.map((comment) => (
            <View
              style={
                comment.isMine ? styles.commentMine : styles.comment
              }
            >
              <Text style={styles.authorText}>{comment.author}</Text>
              <Text style={styles.commentText}>{comment.text}</Text>
              <View style={styles.timeWrapper}>
                <View style={styles.border}>
                  <Text style={styles.date}>
                    {new Date(comment.date).toLocaleDateString(
                      'en-GB',
                      {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      }
                    )}
                  </Text>
                </View>
                <Text style={styles.time}>
                  {new Date(comment.date).toLocaleTimeString(
                    'en-US',
                    {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    }
                  )}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.inputBtn}
          onChangeText={setComment}
          multiline
          value={comment}
          numberOfLines={4}
          placeholder="For comments..."
        ></TextInput>
        <TouchableOpacity
          onPress={sendComment}
          style={styles.sentBtn}
        >
          <AntDesign name="arrowup" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    flexDirection: 'column',
    backgroundColor: 'white',
    width: '100%',
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
  imagePost: {
    marginTop: 32,
    borderRadius: 20,
    width: 343,
    height: 240,
    borderColor: 'green',
    backgroundColor: 'green',
    marginBottom: 30,
  },
  imgWrapper: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentsWrapper: {
    flex: 0.4,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  inputWrapper: {
    flex: 0.1,
    paddingTop: 10,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  authorText: {
    marginTop: 16,
    marginLeft: 16,
    marginRight: 5,
    marginBottom: 5,
    color: '#FF6C00',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 18,
    textAlign: 'left',
  },
  commentText: {
    marginLeft: 16,
    marginRight: 5,
    marginBottom: 5,
    color: '#212121',
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'left',
  },
  timeWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 5,
  },
  date: {
    color: '#BDBDBD',
    fontFamily: 'Roboto-Regular',
    fontSize: 10,
    lineHeight: 12,
    textAlign: 'right',
    borderStyle: 'solid',
    marginRight: 5,
  },
  border: {
    height: '100%',
    borderRightWidth: 1,
    borderColor: '#BDBDBD',
  },
  time: {
    marginLeft: 5,
    marginRight: 5,
    color: '#BDBDBD',
    fontFamily: 'Roboto-Regular',
    fontSize: 10,
    lineHeight: 12,
    textAlign: 'right',
  },
  inputBtn: {
    marginLeft: 16,
    marginRight: 11,
    marginBottom: 5,
    paddingLeft: 16,
    paddingTop: 16,
    height: 50,
    width: '90%',
    textAlign: 'left',
    color: '#BDBDBD',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 18,
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderStyle: 'solid',
    borderRadius: 100,
  },
  comment: {
    width: windowWidth - 90,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderColor: 'rgba(0, 0, 0, 0.03)',
    borderWidth: 1,
    borderRadius: 6,
    marginLeft: 16,
    marginRight: 60,
    flex: 1,
    marginBottom: 16,
  },
  commentMine: {
    width: windowWidth - 90,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderColor: 'rgba(0, 0, 0, 0.03)',
    borderWidth: 1,
    borderRadius: 6,
    marginLeft: 60,
    marginRight: 16,
    flex: 1,
    marginBottom: 16,
  },

  sentBtn: {
    marginTop: 20,
    backgroundColor: '#FF6C00',
    width: 34,
    height: 34,
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
