import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const CommentItem = ({ comment }) => {
    return (
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={comment.id} src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl} />
        </ListItemAvatar>
        <ListItemText
          primary={comment.snippet.topLevelComment.snippet.authorDisplayName}
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