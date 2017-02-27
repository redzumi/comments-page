import { combineReducers }    from 'redux';

import comments               from './Comments/CommentsList';
import commentForm            from './Comments/CommentForm';

export default combineReducers({ comments, commentForm });
