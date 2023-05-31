import { useState, useEffect } from 'react';
import { ref, onValue, off } from 'firebase/database';
import { db } from '../firebase/config';

const usePosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postsRef = ref(db, `posts`);

    const onValueChange = (snapshot) => {
      const postsObject = snapshot.val();

      const postsIds = Object.keys(postsObject);

      const posts = postsIds.map((key) => postsObject[key]);
      console.log(posts);

      setPosts(posts);
      console.log('Posts db data+++++======= ', snapshot.val());
    };

    onValue(postsRef, onValueChange, (error) => {
      console.error('Error reading data:', error);
    });

    // Stop listening for updates when no longer required
    return () => off(postsRef, 'value', onValueChange);
  }, []);

  return posts;
};

export default usePosts;
