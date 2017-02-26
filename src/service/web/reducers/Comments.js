import {
  NEW_COMMENT,
  COMMENTS }     from '../../../common/constants/Comments';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {

    case NEW_COMMENT: {
      return [...state, action.payload];
    }

    case COMMENTS: {
      return action.payload;
    }

    default:
      return state;
  }
};
