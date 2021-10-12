import React from 'react';
import { useQuery } from '@apollo/client';

import PawFeedLayout from '../PawFeedLayout';
import { /*QUERY_POSTS,*/ QUERY_POSTS_BY_FEED } from '../../utils/queries';

const PawFeedList = ({ currentFeed }) => {
    console.log("currentFeed: ", currentFeed);
    const { loading, data } = useQuery(QUERY_POSTS_BY_FEED, {
        variables: { feedName: currentFeed }
    });

    console.log('pawList', data);

    const posts = data?.postsByFeed || [];

    console.log('posts', posts);

    // function filterFeeds() {
    //     if (!currentFeed) {
    //         return posts;
    //     }

    //     return posts.filter(
    //         (post) => post.feedName === currentFeed
    //     );
    // }

    return (
        <div className="pawfeed-list">
            {posts.length ? (
                <div className="flex-row">
                    {posts.map((post) => (
                        <PawFeedLayout
                            key={post._id}
                            _id={post._id}
                            postTitle={post.postTitle}
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