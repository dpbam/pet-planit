import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_POST } from "../../utils/mutations";
import { QUERY_POSTS, QUERY_POSTS_BY_FEED, QUERY_ME } from "../../utils/queries";

const PostForm = ({ currentFeed }) => {
    const [postText, setText] = useState("");
    const [characterCount, setCharacterCount] = useState(0);

    const [addPost, { error }] = useMutation(ADD_POST, {
        update(cache, { data: { addPost } }) {
            try {
                const { postsByFeed } = cache.readQuery({ query: QUERY_POSTS_BY_FEED, variables: { feedName: currentFeed } });

                //prepend the newest post to the front of the array
                cache.writeQuery({
                    query: QUERY_POSTS_BY_FEED,
                    variables: { feedName: currentFeed },
                    data: { postsByFeed: [addPost, ...postsByFeed] }
                });
            }
            catch (e) {
                console.log(e);
            }
            //update me object's cache, appending new post to the end of the array
            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: { ...me, posts: [...me.posts, addPost] } }
            });
        }
    });

    const handleChange = (event) => {
        if (event.target.value.length <= 280) {
            setText(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await addPost({
                variables: { postText: postText, feedName: currentFeed },
            });

            //clear form value
            setTitle('');
            setText("");
            setCharacterCount(0);
            setFeedName('');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <p
                className={`m-0 ${characterCount === 280 || error ? "text-error" : ""}`}
            >
                Character Count: {characterCount}/280
                {error && <span className="ml-2">Something went wrong...</span>}
            </p>
            <form
                className="flex-row justify-center justify-space-between-md align-stretch"
                onSubmit={handleFormSubmit}
            >
                <textarea
                    placeholder="Create a Fun Paw Feed"
                    value={postText}
                    className="form-input col-12 col-md-9"
                    onChange={handleChange}
                ></textarea>
                <button className="btn col-12 col-md-3" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default PostForm;
