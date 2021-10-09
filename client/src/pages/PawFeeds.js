import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_POSTS, QUERY_ME_BASIC } from '../utils/queries';
import PawFeedList from '../components/PawFeedList';
import PawFeedForm from '../components/PawFeedForm';
import Auth from '../utils/auth';

const PawFeeds = () => {
    const { loading, data } = useQuery(QUERY_POSTS);
    const posts = data?.thoughts || [];

    console.log('posts', posts);

    const { data: userData } = uesQuery(QUERY_ME_BASIC);

    const loggedIn = Auth.loggedIn();

    return (
        <main>
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
                        <PawFeedList posts={posts} title="Paw Feeds Gotcha" />
                    )}
                </div>
            </div>
        </main>
    )
}

export default PawFeeds;