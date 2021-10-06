import React from 'react';
import { Link } from 'react-router-dom';

import { useStoreContext } from '../../utils/GlobalState';


const NewsFeed = ({ newsContent, title }) => {
    if (!newsContent.length) {
        return <h3>No News Feed Yet</h3>
    }

    console.log('title', title);
    return (
        <div>
            <h3>{title}</h3>
            {newsContent &&
                newsContent.map(news => (
                    <div key={news._id} className="card mb-3">
                        <p className="card-header">
                            <Link
                                to={`/profile/${news.username}`}
                                style={{ fontWeight: 700 }}
                                className="text-light"
                            >
                                {news.username}
                            </Link>{' '}
                            news on {news.createdAt}
                        </p>
                        <div className="card-body">
                            <Link to={`/news/${news._id}`}>
                                <p>{news.newsText}</p>
                                <p className="mb-0">
                                    Reactions: {news.reactionCount} || Click to{' '}
                                    {news.reactionCount ? 'see' : 'start'} the discussion!
                                </p>
                            </Link>
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default NewsFeed;