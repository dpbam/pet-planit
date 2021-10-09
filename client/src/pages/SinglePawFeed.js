import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_POST } from '../utils/queries';
import ReplyList from '../components/ReplyList';
import ReplyForm from '../components/ReplyForm';
import Auth from '../utils/auth';

const SinglePawFeed = props => {
    const { id: postId } = useParams();

    const { loading, data } = useQuery(QUERY_POST, {
        variables: { id: postId }
    });

    const post = data?.news || {};

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="card mb-3">
                <p className="card-header">
                    <span style={{ fontWeight: 700 }} className="text-light">
                        {post.username}
                    </span>{' '}
                    post on {post.createdAt}
                </p>
                <div className="card-body">
                    <p>{post.postText}</p>
                </div>
            </div>
            {post.replyCount > 0 && <ReplyList replies={post.replies} />}
            {Auth.loggedIn() && <ReplyForm postId={post._id} />}
        </div>
    );
};

export default SinglePawFeed;