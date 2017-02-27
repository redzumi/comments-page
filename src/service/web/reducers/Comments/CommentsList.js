import {
  NEW_COMMENT,
  SET_COMMENTS }     from '../../../../common/constants/Comments';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {

    case NEW_COMMENT: {
      return [...state, action.payload];
    }

    case SET_COMMENTS: {
      return action.payload;
    }

    default:
      return state;
  }
};
