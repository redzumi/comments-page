import {
  ADD_COMMENT_REQUEST,
  REMOVE_COMMENT_REQUEST } from '../../../common/constants/Comments';

export const addComment = (comment) => ({
  type: ADD_COMMENT_REQUEST,
  payload: comment
});

export const removeComment = (comment) => ({
  type: REMOVE_COMMENT_REQUEST,
  payload: comment
});
