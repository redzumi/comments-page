import { ADD_COMMENT_REQUEST } from '../../../common/constants/Comments';

export const addComment = (comment) => ({
  type: ADD_COMMENT_REQUEST,
  payload: comment
});
