import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_FEEDS } from '../../utils/queries';

function FeedMenu({ setFeed }) {
    const [activeFeed, setActiveFeed] = useState("General");

    const { data: feedData } = useQuery(QUERY_FEEDS);
    const feeds = feedData?.feeds || [];

    console.log('feed menu', feedData);
    return (
        <div className="drawer">
            <ul className="feed-menu">
                {feeds.map((feed) => (
                    <li 
                        className={activeFeed === feed.feedName ? `active ${feed.feedName}` : feed.feedName}
                        key={feed._id}
                        onClick={() => {
                            setFeed(feed.feedName);
                            setActiveFeed(feed.feedName);
                        }}
                    >
                        {feed.feedName}
                    </li>
                ))}
            </ul>
        </div>
    )   
}

export default FeedMenu;