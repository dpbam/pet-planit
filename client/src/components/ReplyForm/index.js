import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_REPLY } from '../../utils/mutations';

const ReplyForm = ({ postId }) => {
  const [replyText, setText] = useState('');

  const [CharacterCount, setCharacterCount] = useState(0);

  const [addReply, { error }] = useMutation(ADD_REPLY);

  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
      console.log('setText', event.target.value);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addReply({
        variables: { replyText, postId },
      });

      setText('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='reply-form-container'>
      <form className='reply-form' onSubmit={handleFormSubmit}>
        <textarea
          placeholder='Leave a reply...'
          value={replyText}
          className='form-input col-12 col-md-9'
          onChange={handleChange}
        ></textarea>
        <p className='m-0'>Character Count: {CharacterCount}/280</p>
        <button type='submit'>Submit</button>
      </form>
      {error && <span className='ml-2'>Something went wrong ...</span>}
    </div>
  );
};

export default ReplyForm;
