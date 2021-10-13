import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_POST } from '../utils/queries';
import ReplyList from '../components/ReplyList';
import ReplyForm from '../components/ReplyForm';
import Auth from '../utils/auth';
import { Link } from "react-router-dom";

const SinglePawFeed = props => {
    const { id: postId } = useParams();

    const { loading, data } = useQuery(QUERY_POST, {
        variables: { id: postId }
    });
    console.log('single feed data id', postId);
    console.log('single feed data', data);

    const post = data?.post || {};

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="content single-post-container">
            <h3>Viewing post from {post.username}</h3>
            <div className="card single-post-card">
                <p className="card-header">
                    <div>
                        <Link to={{pathname: "/profile",state: {username:post.username}}} className="username-link">
                            {post.username}
                        </Link>
                        <hr className="post-card-hr"/>
                        {post.postTitle}
                        <span>&nbsp;&nbsp;({post.feedName})</span>
                    </div>
                    <span>{post.createdAt}</span>
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