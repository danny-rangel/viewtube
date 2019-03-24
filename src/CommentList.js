import React from 'react';
import CommentItem from './CommentItem'
import List from '@material-ui/core/List';

const CommentList = ({ video, comments }) => {

    const renderedList = comments.map(comment => {
            return <CommentItem key={comment.id} comment={comment}/>;
        });

    return (
        <>
            <h4 style={{fontWeight: '100'}}>{`${video.statistics.commentCount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} comments`}</h4>
            <List >
                {renderedList}
            </List>
        </>
    );
}


export default CommentList;