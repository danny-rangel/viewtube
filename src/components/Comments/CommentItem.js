import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

const CommentItem = ({ comment }) => {
  
    return (
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={comment.id} src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <div style={{margin: 0}}>
              <h5 style={{display: 'inline-block', margin: 0}}>{comment.snippet.topLevelComment.snippet.authorDisplayName}</h5>
              {'  '}
              <h5 style={{display: 'inline-block', margin: 0, color: 'gray'}}>{moment(comment.snippet.topLevelComment.snippet.publishedAt).fromNow()}</h5>
            </div>
          }
          secondary={
            <>
              <Typography component="span" color="textPrimary" style={{overflow: 'hidden'}}>
                {comment.snippet.topLevelComment.snippet.textOriginal}
              </Typography>
            </>
          }
        />
        </ListItem>
    );
}


export default CommentItem;