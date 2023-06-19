import { useState, useEffect } from 'react';
import { ref, onValue, off, orderByChild } from 'firebase/database';
import { db } from '../firebase/config';
import { useSelector } from 'react-redux';

const useComments = (postId) => {
  const [comments, setComments] = useState([]);
  const { userId } = useSelector((state) => {
    return state.auth;
  });

  // This takes all comments for all posts.
  // TODO: implement filtering of comments by postId
  // Good way - with firebase query (need to learn how to do it)
  // Worse way - with manual filtering inside onValueChange (comments.filter(...))
  useEffect(() => {
    console.log('postId', postId);
    const commentsRef = ref(db, `comments`);

    const onValueChange = (snapshot) => {
      const commentsObject = snapshot.val();

      if (!commentsObject) return false;

      const commentsIds = Object.keys(commentsObject);

      const comments = commentsIds.map((commentId) => ({
        commentId,
        ...commentsObject[commentId],
        isMine: userId === commentsObject[commentId].userId,
      }));

      setComments(comments);
    };

    onValue(commentsRef, onValueChange, (error) => {
      console.error('Error reading data:', error);
    });

    // Stop listening for updates when no longer required
    return () => off(commentsRef, 'value', onValueChange);
  }, []);

  const getPostComments = (postId) =>
    comments.filter((comment) => comment.postId === postId);

  return { comments, getPostComments };
};

export default useComments;
