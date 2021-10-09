import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_POST } from '../../utils/mutations';
import { QUERY_POSTS, QUERY_ME } from '../../utils/queries';

const PostForm = () => {
    const [postText, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const [addPost, { error }] = useMutation(ADD_POST, {
        update(cache, { data: { addPost } }) {
            try {
                //could potentially not exist yet, so wrap in a try...catch
                //read what's currently in the cache
                const { posts } = cache.readQuery({ query: QUERY_POSTS });

                //prepend the newest thought to the front of the array
                cache.writeQuery({
                    query: QUERY_POSTS,
                    data: { posts: [addPost, ...posts] }
                });
            }
            catch (e) {
                console.log(e);
            }
            //update me object's cache, appending new thought to the end of the array
            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: { ...me, posts: [...me.posts, addPost] } }
            });
        }
    });
}