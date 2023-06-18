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
import { MaterialIcons } from '@expo/vector-icons';
import useComments from '../../../hooks/useComments';
import { db } from '../../../firebase/config';
import { ref, set } from 'firebase/database';
import { useSelector } from 'react-redux';

const windowWidth = Dimensions.get('window').width;
const SpanText = ({ children, style }) => {
  return (
    <View style={styles.textWrapper}>
      <Text style={style}>{children}</Text>
      <View style={styles.borderRight} />
    </View>
  );
};
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

        <ScrollView
          style={styles.commentsWrapper}
          ref={commentsWrapperRef}
        >
          {comments.map((comment) => (
            <View
              style={
                comment.isMine ? styles.commentMine : styles.comment
              }
            >
              <Text style={styles.authorText}>{comment.author}</Text>
              <Text style={styles.commentText}>{comment.text}</Text>
              <Text style={styles.dateText}>
                {new Date(comment.date).toLocaleDateString()}
                <SpanText
                // style={{
                //   height: '100%',
                //   borderRightWidth: 1,
                //   borderColor: 'black',
                // }}
                ></SpanText>
                {new Date(comment.date).toLocaleTimeString()}
              </Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.inputBtn}
            onChangeText={setComment}
            multiline
            value={comment}
            numberOfLines={4}
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
  imagePost: {
    marginTop: 32,
    borderRadius: 20,
    width: 343,
    height: 240,
    borderColor: 'green',
    backgroundColor: 'green',
    marginBottom: 30,
  },

  commentsWrapper: {
    height: 250,
    flexGrow: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  authorText: {
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 5,
    color: '#BDBDBD',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 18,
    textAlign: 'left',
    margin: 0,
    padding: 0,
  },
  dateText: {
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 5,
    color: '#BDBDBD',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 18,
    textAlign: 'right',
    margin: 0,
    padding: 0,
  },
  textWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    margin: 0,
    padding: 0,
  },
  borderRight: {
    height: '100%',
    borderRightWidth: 1,
    borderColor: 'grey',
    margin: 0,
    padding: 0,
  },
  inputWrapper: {
    width: '100%',
    position: 'relative',
  },
  inputBtn: {
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
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
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
