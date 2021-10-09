import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../utils/queries';
import PawFeedList from '../components/PawFeedList';
import PawFeedForm from '../components/PawFeedForm';
import FeedMenu from '../components/FeedMenu';
import Auth from '../utils/auth';

const PawFeeds = () => {
    const [currentFeed, setFeed] = useState("");

    const { loading, data } = useQuery(QUERY_POSTS);
    const posts = data?.posts || [];

    console.log('posts', posts);

    const loggedIn = Auth.loggedIn();

    return (
        <main>
            <div>
                <FeedMenu setFeed={setFeed} />
            </div>
            <div className='flex-rwo justify-space-between'>
                {loggedIn && (
                    <div className='col-12 mb-3'>
                        <PawFeedForm />
                    </div>
                )}
                <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <PawFeedList currentFeed={currentFeed} posts={posts} title="Paw Feeds Gotcha" />
                    )}
                </div>
            </div>
        </main>
    )
}

export default PawFeeds;