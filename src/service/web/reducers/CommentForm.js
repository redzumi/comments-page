import {
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_RESULT }     from '../../../common/constants/Comments';

const initialState = {
  processing: false,
  result: null
};

export default (state = initialState, action) => {
  switch (action.type) {

    case ADD_COMMENT_REQUEST: {
      return {...state, processing: true };
    }

    case ADD_COMMENT_RESULT: {
      return {...state, processing: false, result: action.payload };
    }

    default:
      return state;
  }
};
