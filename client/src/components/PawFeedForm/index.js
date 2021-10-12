import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_POST } from "../../utils/mutations";
import { /*QUERY_POSTS,*/ QUERY_POSTS_BY_FEED, QUERY_ME } from "../../utils/queries";

const PostForm = ({ currentFeed }) => {
  const [postText, setText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  const [addPost, { error }] = useMutation(ADD_POST, {
      update(cache, { data: { addPost } }) {
          try {
              //could potentially not exist yet, so wrap in a try...catch
              //read what's currently in the cache
              const { postsByFeed } = cache.readQuery({ query: QUERY_POSTS_BY_FEED, variables: { feedName: currentFeed } });

              //prepend the newest thought to the front of the array
              cache.writeQuery({
                  query: QUERY_POSTS_BY_FEED,
                  variables: { feedName: currentFeed },
                  data: { postsByFeed: [addPost, ...postsByFeed] }
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
      setText("");
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  const refreshPage = () => {
    // update to only refresh feed
    window.location.reload();
  }

  return (
    <div className="new-post-form">
      <button onClick={refreshPage} className="refresh-pawfeed">Refresh Pawfeed</button>
      <form
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Create post..."
          value={postText}
          onChange={handleChange}
        ></textarea>

        <button type="submit">
          + Post&nbsp;
        </button>
      </form>
      <p className={`m-0 ${characterCount === 280 || error ? "text-error" : ""}`}>Character Count: {characterCount}/280
      </p>
      {error && <span className="ml-2">Something went wrong...</span>}
    </div>
  );
};

export default PostForm;
