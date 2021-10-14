import React from 'react';
import { Link } from 'react-router-dom';

const ReplyList = ({ replies }) => {
    return (
        <div className="card">
            <div className="card-header">
                <span className="text-light">Replies</span>
            </div>
            <div className="card-body">
                {replies &&
                    replies.map(reply => (
                        <p className="pill mb-3" key={reply._id}>
                            {reply.replyText} {'// '}
                            <Link to={{pathname: "/profile",state: {username:reply.username}}} style={{ fontWeight: 700 }}>
                                {reply.username} on {reply.createdAt}
                            </Link>
                        </p>
                    ))}
            </div>
        </div>
    );
};

export default ReplyList;