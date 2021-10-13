import React from 'react';
import { Link } from 'react-router-dom';

const ReplyList = ({ replies }) => {
    return (
        <div className="card reply-card">
            <div className="card-header">
                {/* <h3 className="replies-header">Replies</h3> */}
            </div>
            <div className="card-body">
                {replies &&
                    replies.map(reply => (
                        <div className="user-reply" key={reply._id}>
                            {reply.replyText} {'// From: '}
                            <Link to={{pathname: "/profile",state: {username:reply.username}}}>
                                {reply.username} 
                            </Link>
                            &nbsp;on {reply.createdAt}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ReplyList;