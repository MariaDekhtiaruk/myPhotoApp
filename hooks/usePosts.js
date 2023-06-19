import { useState, useEffect } from 'react';
import { ref, onValue, off } from 'firebase/database';
import { db } from '../firebase/config';
import useComments from './useComments';

const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const { getPostComments, comments } = useComments();

  useEffect(() => {
    const postsRef = ref(db, `posts`);

    const onValueChange = (snapshot) => {
      const postsObject = snapshot.val();

      const postsIds = Object.keys(postsObject);

      const posts = postsIds.map((postId) => ({
        postId,
        commentsCount: getPostComments(postId).length,
        ...postsObject[postId],
      }));
      console.log('posts', posts);

      setPosts(posts);
      console.log('Posts db data+++++======= ', snapshot.val());
    };

    onValue(postsRef, onValueChange, (error) => {
      console.error('Error reading data:', error);
    });

    // Stop listening for updates when no longer required
    return () => off(postsRef, 'value', onValueChange);
  }, [comments]);

  return posts;
};

export default usePosts;
