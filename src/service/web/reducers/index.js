import { combineReducers }    from 'redux';

import comments               from './Comments';
import commentForm            from './CommentForm';

export default combineReducers({ comments, commentForm });
