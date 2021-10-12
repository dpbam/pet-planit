import React, { useState } from 'react';
import PawFeedList from '../components/PawFeedList';
import PawFeedForm from '../components/PawFeedForm';
import FeedMenu from '../components/FeedMenu';
import Auth from '../utils/auth';

const PawFeeds = () => {
    const [currentFeed, setFeed] = useState("");

    const loggedIn = Auth.loggedIn();

    return (
        <main className="pawfeed-container">
            <FeedMenu setFeed={setFeed} />
            <div className="feed-section">
                {loggedIn && (
                    <PawFeedForm currentFeed={currentFeed} />
                )}
                <PawFeedList currentFeed={currentFeed} />
            </div>
        </main>
    )
}

export default PawFeeds;