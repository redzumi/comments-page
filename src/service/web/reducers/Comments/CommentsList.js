import {
  SET_COMMENTS,
  NEW_COMMENT,
  REMOVE_COMMENT }     from '../../../../common/constants/Comments';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {

    case SET_COMMENTS: {
      return [ ...action.payload ];
    }

    case NEW_COMMENT: {
      return [ ...state, action.payload ];
    }

    case REMOVE_COMMENT: {
      return [ ...state.filter(comment => {
        return comment.id !== action.payload.id
      }) ];
    }

    default:
      return state;
  }
};
