import React from 'react';
import CommentItem from './CommentItem'
import styled from 'styled-components';
import List from '@material-ui/core/List';
import CircularProgress from '@material-ui/core/CircularProgress';

const StyledDiv = styled.div`
    width: 90%;
    padding: 10px 0;
    margin: 0 auto;
`;

const StyledProgress = styled(CircularProgress)`
    && {
        align-self: center;
        justify-self: center;
        color: black;
    }
`;

const CommentList = ({ video, comments }) => {
    if (comments.length === 0) {
        return <div style={{margin: '20px 0'}}>No comments to show</div>
    }

    const renderedList = comments.map(comment => {
            return <CommentItem key={comment.id} comment={comment}/>;
    });

    return (
        video && comments ? (
            <StyledDiv>
                <h4 
                    style={{fontWeight: '100', margin: 0}}>
                    {`${video.statistics.commentCount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} comments`}
                </h4>
                <List >
                    {renderedList}
                </List>
            </StyledDiv>
        ) : (
            <StyledDiv>
                <StyledProgress />
            </StyledDiv>
        )
    );
}


export default CommentList;