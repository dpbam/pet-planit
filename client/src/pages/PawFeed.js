import React, { useState } from 'react';
import PawFeedList from '../components/PawFeedList';
import PawFeedForm from '../components/PawFeedForm';
import FeedMenu from '../components/FeedMenu';
import Auth from '../utils/auth';

const PawFeeds = () => {
    const [currentFeed, setFeed] = useState("");

    const loggedIn = Auth.loggedIn();

    return (
        <main className="pawfeed-container content">
                <FeedMenu setFeed={setFeed} />
            <div className="feed-section">
            <h2>Welcome to the Pawfeed!</h2>
                {loggedIn && (
                    <PawFeedForm currentFeed={currentFeed} />
                )}
                <PawFeedList currentFeed={currentFeed} />
            </div>
        </main>
    )
}

export default PawFeeds;