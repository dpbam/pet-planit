import React from "react";
import { Link } from "react-router-dom";

function PawFeedLayout(post) {
    const {
        _id,
        postTitle,
        postText,
        createdAt,
        username,
        replyCount
    } = post;

    return (
        <div key={_id} className="card">
            <div className="card-header">
                <div>
                    <Link to={`/profile/${username}`} className="username-link">
                        {username}
                    </Link>
                    <hr className="post-card-hr" />
                    {postTitle}Temp Title
                </div>
                <span className="created-at">{createdAt}</span>
            </div>
            <div className="card-body">
                {/* <Link to={`/pawfeeds/${_id}`}>
                    {postTitle} Temp Title:
                </Link> */}
                <span>{postText}</span>
            </div>
            <Link to={`/pawfeed/${_id}`}>
                <span className="view-replies">View replies({replyCount}) {">"}</span>
            </Link>
            
        </div >
    );
}

export default PawFeedLayout;