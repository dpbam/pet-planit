import React from 'react';

import { Link } from 'react-router-dom';

const PawFeedList = ({ posts, feedName }) => {
    if (!posts.length) {
        return <h3>No Paw Feed Yet</h3>
    }

    return (
        <div>
            <h3>{feedName}</h3>
            {posts &&
                posts.map(post => (
                    <div key={post._id} className="card mb-3">
                        <p className="card-header">
                            <Link
                                to={`/profile/${post.username}`}
                                style={{ fontWeight: 700 }}
                                className="text-light"
                            >
                                {post.username}
                            </Link>{' '}
                            post on {post.createdAt}
                        </p>
                        <div className="card-body">
                            <Link to={`/pawfeeds/${post._id}`}>
                                <p>{post.postText}</p>
                                <p className="mb-0">
                                    Replies: {post.replyCount} || Click to{' '}
                                    {post.replyCount ? 'see' : 'start'} the pets fun!
                                </p>
                            </Link>
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default PawFeedList;