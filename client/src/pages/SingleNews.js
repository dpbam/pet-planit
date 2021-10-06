import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHT } from '../utils/queries';
import ReactionList from '../components/ReactionList';
import ReactionForm from '../components/ReactionForm';
import Auth from '../utils/auth';

const SingleNews = props => {
    const { id: newsId } = useParams();

    const { loading, data } = useQuery(QUERY_NEWS, {
        variables: { id: newsId }
    });

    const news = data?.news || {};

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="card mb-3">
                <p className="card-header">
                    <span style={{ fontWeight: 700 }} className="text-light">
                        {news.username}
                    </span>{' '}
                    news on {news.createdAt}
                </p>
                <div className="card-body">
                    <p>{news.newsText}</p>
                </div>
            </div>
            {news.reactionCount > 0 && <ReactionList reactions={news.reactions} />}
            {Auth.loggedIn() && <ReactionForm newsId={news._id} />}
        </div>
    );
};

export default SingleNews;