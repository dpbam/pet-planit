import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_POST } from '../../utils/mutations';
import { QUERY_POSTS, QUERY_ME_FORM } from '../../utils/queries';

const PostForm = () => {

    const [postTitle, setTitle] = useState('');
    const [postText, setText] = useState('');
    const [feedName, setFeedName] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const [addPost, { error }] = useMutation(ADD_POST, {
        update(cache, { data: { addPost } }) {
            try {
                const { posts } = cache.readQuery({ query: QUERY_POSTS });

                console.log('form post data', posts);

                cache.writeQuery({
                    query: QUERY_POSTS,
                    data: { posts: [addPost, ...posts] }
                });

                console.log('form post', posts);
            }
            catch (e) {
                console.log(e);
            }
            // //update me object's cache, appending new post to the end of the array
            // const { me } = cache.readQuery({ query: QUERY_ME_FORM });
            // console.log('me', me);
            // cache.writeQuery({
            //     query: QUERY_ME_FORM,
            //     data: { me: { ...me, posts: [...me.posts, addPost] } }
            // });
        }
    });

    const handleChangeTitle = event => {
        setTitle(event.target.value);
        console.log(event.target.value);
    }

    const handleChangeText = event => {
        if (event.target.value.length <= 280) {
            setText(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    }

    const handleChangeFeedName = event => {
        setFeedName(event.target.value);
        console.log(event.target.value);
    }

    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            await addPost({
                variables: { postTitle, postText, feedName }
            });

            //clear form value
            setTitle('');
            setText('');
            setCharacterCount(0);
            setFeedName('');
        }
        catch (e) {
            console.error(e);
        }
    };

    const refreshPage = () => {
      // update to only refresh feed
      window.location.reload();
    }

    return (
      <div className="new-post-form">
        {/* <button onClick={refreshPage} className="refresh-pawfeed">Refresh Pawfeed</button> */}
        <form onSubmit={handleFormSubmit}>
            <label>Join the conversation:</label>
            <input
              type="text"
              placeholder="Title"
              value={postTitle}
              onChange={handleChangeTitle}
            ></input>
            <select value={feedName} onChange={handleChangeFeedName}>
                <option value="" disabled>Topic</option>
                <option value="General">General</option>
                <option value="Pet Adoption">Pet Adoption</option>
                <option value="Pet Sitting">Pet Sitting</option>
                <option value="Pet Advice">Pet Advice</option>
                <option value="Dog Dates">Dog Dates</option>
                <option value="Lost Pets">Lost Pets</option>
            </select>
            <textarea
                placeholder="Create post..."
                value={postText}
                onChange={handleChangeText}
            ></textarea>
            <button type="submit">
                Submit
            </button>
        </form>
        <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
            Character Count: {characterCount}/280   
        </p>
        {error && <span className="ml-2">Something went wrong...</span>}
      </div>
    )
}

export default PostForm;
