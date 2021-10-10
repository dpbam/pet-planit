import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_REPLY } from '../../utils/mutations';

const ReplyForm = ({ postId }) => {
    const [replyText, setText] = useState('');

    const [CharacterCount, setCharacterCount] = useState(0);

    const [addReply, { error }] = useMutation(ADD_REPLY);

    const handleChange = event => {
        if (event.target.value.length <= 280) {
            setText(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            await addReply({
                variables: { replyText, postId }
            });

            setText('');
            setCharacterCount(0);
        }
        catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <p className="m-0">
                Character Count: {CharacterCount}/280
                {error && <span className="ml-2">Something went wrong ...</span>}
            </p>
            <form className="flex-row justify-center justify-space-between-md align-stretch"
                onSubmit={handleFormSubmit}
            >
                <textarea
                    placeholder="Join the Paw"
                    value={replyText}
                    className="form-input col-12 col-md-9"
                    onChange={handleChange}
                ></textarea>

                <button className="btn col-12 col-md-3" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default ReplyForm;