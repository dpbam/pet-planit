import React from 'react';
import { useQuery } from '@apollo/client';

import PawFeedLayout from '../PawFeedLayout';
import { QUERY_POSTS } from '../../utils/queries';

const PawFeedList = ({ currentFeed }) => {
    const { loading, data } = useQuery(QUERY_POSTS);

    const posts = data?.posts || [];

    console.log('posts', posts);
    function filterFeeds() {
        if (!currentFeed) {
            return posts;
        }

        return posts.filter(
            (post) => post.feedName._id === currentFeed
        );
    }

    return (
        <div>
            {posts.length ? (
                <div className="flex-row">
                    {filterFeeds().map((post) => (
                        <PawFeedLayout
                            key={post._id}
                            _id={post._id}
                            postText={post.postText}
                            createdAt={post.createdAt}
                            username={post.username}
                            replyCount={post.replyCount}
                        />
                    ))}
                </div>
            ) : (
                <h3>You haven't added any post yet!</h3>
            )}
            {loading ? (
                <div>Loading...</div>
            ) : null}
        </div>
    )
}

export default PawFeedList;