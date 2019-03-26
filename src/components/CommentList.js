import React from 'react';
import CommentItem from './CommentItem'
import List from '@material-ui/core/List';

const CommentList = ({ video, comments }) => {

    if (comments.length === 0) {
        return <div style={{margin: '20px 0'}}>No comments to show</div>
    }

    const renderedList = comments.map(comment => {
            return <CommentItem key={comment.id} comment={comment}/>;
    });

    return (
        <>
            <h4 
                style={{fontWeight: '100', margin: 0}}>
                {`${video.statistics.commentCount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} comments`}
            </h4>
            <List >
                {renderedList}
            </List>
        </>
    );
}


export default CommentList;