import { useState, useEffect } from 'react';
import { ref, onValue, off, orderByChild } from 'firebase/database';
import { db } from '../firebase/config';

const useComments = (postId) => {
  const [comments, setComments] = useState([]);

  // This takes all comments for all posts.
  // TODO: implement filtering of comments by postId
  // Good way - with firebase query (need to learn how to do it)
  // Worse way - with manual filtering inside onValueChange (comments.filter(...))
  useEffect(() => {
    console.log('postId', postId);
    const commentsRef = ref(db, `comments`);

    const onValueChange = (snapshot) => {
      const commentsObject = snapshot.val();

      const commentsIds = Object.keys(commentsObject);

      const comments = commentsIds.map((commentId) => ({
        commentId,
        ...commentsObject[commentId],
      }));
      console.log(comments);

      setComments(comments);
      console.log('Comments db data: ', snapshot.val());
    };

    onValue(commentsRef, onValueChange, (error) => {
      console.error('Error reading data:', error);
    });

    // Stop listening for updates when no longer required
    return () => off(commentsRef, 'value', onValueChange);
  }, []);

  return comments;
};

export default useComments;
